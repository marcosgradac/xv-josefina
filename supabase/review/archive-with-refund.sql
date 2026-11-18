-- Review against the deployed schema. Apply this file alone, before releasing the UI.
begin;

create table public.rsvp_refunds (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null unique references public.rsvp_submissions(id) on delete restrict,
  family_name text not null,
  amount numeric not null check (amount < 0),
  recorded_by uuid not null,
  created_at timestamptz not null default now()
);

alter table public.rsvp_refunds enable row level security;
revoke all on public.rsvp_refunds from public, anon, authenticated;
grant select on public.rsvp_refunds to authenticated;
create policy rsvp_refunds_admin_read on public.rsvp_refunds for select to authenticated
  using ((select public.my_admin_status()) is true);

-- Serialize new receipts with archival using the same parent row lock.
create function public.guard_payment_on_active_rsvp()
returns trigger language plpgsql security definer set search_path = '' as $$
declare
  archived timestamptz;
begin
  select s.archived_at into archived from public.rsvp_submissions s
    where s.id = new.submission_id for update;
  if not found or archived is not null then
    raise exception 'La asistencia ya no está activa.' using errcode = '23514';
  end if;
  return new;
end;
$$;
revoke all on function public.guard_payment_on_active_rsvp() from public, anon, authenticated;
create trigger guard_payment_on_active_rsvp
  before insert on public.payments
  for each row execute function public.guard_payment_on_active_rsvp();

create function public.archive_rsvp_with_refund(
  p_id uuid, p_updated_at timestamptz, p_confirmed_paid numeric
)
returns void language plpgsql security definer set search_path = '' as $$
declare
  family public.rsvp_submissions%rowtype;
  received numeric;
  actor uuid := auth.uid();
begin
  if actor is null or public.my_admin_status() is distinct from true then
    raise exception 'Se requiere acceso de administrador.' using errcode = '42501';
  end if;

  select * into family from public.rsvp_submissions where id = p_id for update;
  if not found then
    raise exception 'La asistencia ya no está disponible.' using errcode = 'P0001';
  end if;
  if family.archived_at is not null then
    return;
  end if;
  if family.updated_at is distinct from p_updated_at then
    raise exception 'La asistencia cambió. Actualizá el panel antes de confirmar.' using errcode = 'P0001';
  end if;

  select coalesce(sum(amount), 0) into received from public.payments where submission_id = p_id;
  if received is distinct from p_confirmed_paid then
    raise exception 'El importe abonado cambió. Actualizá el panel y confirmá solo si ya devolviste el nuevo importe.' using errcode = 'P0001';
  end if;

  if received > 0 then
    insert into public.rsvp_refunds (submission_id, family_name, amount, recorded_by)
      values (p_id, family.full_name, -received, actor);
  end if;
  update public.rsvp_submissions set archived_at = now() where id = p_id;
end;
$$;
revoke all on function public.archive_rsvp_with_refund(uuid, timestamptz, numeric) from public, anon, authenticated;
grant execute on function public.archive_rsvp_with_refund(uuid, timestamptz, numeric) to authenticated;

commit;
