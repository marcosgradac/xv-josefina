import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { PGlite } from '@electric-sql/pglite';
import { createClient } from '@supabase/supabase-js';
import { archiveFamily, loadAdminData } from '../src/lib/adminData.ts';

const db = new PGlite();
const paidId = '10000000-0000-4000-8000-000000000001';
const unpaidId = '10000000-0000-4000-8000-000000000002';
const oldId = '10000000-0000-4000-8000-000000000003';
const adminId = '10000000-0000-4000-8000-000000000004';
const stamp = '2026-11-17T00:00:00Z';
try {
  await db.exec(`
    create role anon;
    create role authenticated;
    create schema auth;
    grant usage on schema auth to authenticated;
    create function auth.uid() returns uuid language sql as
      $$ select nullif(current_setting('test.user', true), '')::uuid $$;
    create function public.my_admin_status() returns boolean language sql as
      $$ select auth.uid() = '${adminId}'::uuid $$;
    create table public.rsvp_submissions (
      id uuid primary key, full_name text not null, total_guests integer not null,
      total_amount numeric not null, updated_at timestamptz not null, archived_at timestamptz
    );
    create table public.payments (
      submission_id uuid references public.rsvp_submissions(id), amount numeric check(amount > 0)
    );
    create view public.rsvp_dashboard as
      select s.*, coalesce(p.paid, 0) as amount_paid,
        s.total_amount - coalesce(p.paid, 0) as balance_due
      from public.rsvp_submissions s
      left join (select submission_id, sum(amount) as paid from public.payments group by 1) p
        on p.submission_id = s.id
      where s.archived_at is null;
    insert into public.rsvp_submissions values
      ('${paidId}', 'Pagó adelantos', 5, 185000, '${stamp}', null),
      ('${unpaidId}', 'Sin pagos', 1, 60000, '${stamp}', null),
      ('${oldId}', 'Archivada anteriormente', 1, 60000, '${stamp}', '${stamp}');
    insert into public.payments values ('${paidId}', 50000), ('${paidId}', 30000), ('${oldId}', 60000);
  `);
  await db.exec(readFileSync(new URL('../supabase/review/archive-with-refund.sql', import.meta.url), 'utf8'));
  const archive = (id, amount, updated = stamp) =>
    db.query('select public.archive_rsvp_with_refund($1, $2, $3)', [id, updated, amount]);
  await db.exec('set role anon');
  await assert.rejects(archive(paidId, 80000), /permission denied/);
  await assert.rejects(db.query('select * from public.rsvp_refunds'), /permission denied/);
  await db.exec('reset role; set role authenticated');
  await assert.rejects(archive(paidId, 80000), /administrador/);
  assert.deepEqual((await db.query('select * from public.rsvp_refunds')).rows, []);
  await db.query("select set_config('test.user', $1, false)", [adminId]);

  const requestFamily = { id: paidId, updated_at: stamp, amount_paid: 80000 };
  const rpcClient = { rpc: async (name, args) => {
    assert.equal(name, 'archive_rsvp_with_refund');
    try {
      await archive(args.p_id, args.p_confirmed_paid, args.p_updated_at);
      return { error: null };
    } catch (error) {
      return { error };
    }
  } };
  await assert.rejects(archiveFamily({ ...requestFamily, amount_paid: 50000 }, rpcClient), /importe abonado cambió/);
  await assert.rejects(archiveFamily({ ...requestFamily, updated_at: '2026-11-16T00:00:00Z' }, rpcClient), /asistencia cambió/);
  await db.exec(`
    reset role;
    create function reject_archive_for_test() returns trigger language plpgsql as
      $$ begin raise exception 'Fallo de prueba al archivar'; end $$;
    create trigger reject_archive_for_test before update on public.rsvp_submissions
      for each row execute function reject_archive_for_test();
    set role authenticated;
  `);
  await assert.rejects(archiveFamily(requestFamily, rpcClient), /Fallo de prueba/);
  assert.deepEqual((await db.query('select * from public.rsvp_refunds')).rows, []);
  await db.exec('reset role; drop trigger reject_archive_for_test on public.rsvp_submissions; set role authenticated');

  await archiveFamily(requestFamily, rpcClient);
  await archiveFamily(requestFamily, rpcClient);
  await archive(unpaidId, 0);
  await archive(oldId, 60000);
  const refundRows = (await db.query('select submission_id, amount, recorded_by from public.rsvp_refunds')).rows;
  assert.deepEqual(refundRows, [{ submission_id: paidId, amount: '-80000', recorded_by: adminId }]);
  await db.exec('reset role');
  await assert.rejects(db.query('insert into public.payments values ($1, 1000)', [paidId]), /ya no está activa/);
  const totals = (await db.query(`
    select count(*)::int as families, coalesce(sum(total_guests), 0)::int as guests,
      coalesce(sum(total_amount), 0)::int as total, coalesce(sum(amount_paid), 0)::int as paid,
      coalesce(sum(balance_due), 0)::int as due from public.rsvp_dashboard
  `)).rows[0];
  assert.deepEqual(totals, { families: 0, guests: 0, total: 0, paid: 0, due: 0 });
  const ledger = (await db.query(`
    select (select count(*)::int from public.payments) as receipts,
      (select sum(amount) from public.payments where submission_id = $1) +
      (select sum(amount) from public.rsvp_refunds where submission_id = $1) as net
  `, [paidId])).rows[0];
  assert.deepEqual(ledger, { receipts: 3, net: '0' });

  const historyClient = createClient('https://refund-contract.example.test', 'public-test', {
    global: { fetch: async url => {
      const target = new URL(url);
      let body;
      if (target.pathname.endsWith('/my_admin_status')) body = true;
      else if (target.pathname.endsWith('/rsvp_dashboard')) body = [];
      else if (target.pathname.endsWith('/rsvp_refunds')) {
        body = (await db.query('select * from public.rsvp_refunds')).rows;
      } else if (target.pathname.endsWith('/payments')) {
        assert.equal(target.searchParams.get('submission_id'), 'in.(' + paidId + ')');
        body = [{ id: 'receipt', submission_id: paidId, amount: 50000 }];
      } else throw new Error('Consulta inesperada');
      return new Response(JSON.stringify(body), { headers: { 'Content-Type': 'application/json' } });
    } },
  });
  historyClient.auth.getUser = async () => ({ data: { user: { id: adminId } }, error: null });
  const visible = await loadAdminData(historyClient);
  assert.deepEqual(visible.families, []);
  assert.equal(visible.refunds[0].amount, -80000);
  assert.deepEqual(visible.payments.map(item => item.response_id), [paidId]);
  console.log('OK: archivado y devolución en PostgreSQL local, rollback, permisos, reintentos, historial y totales netos.');
} finally {
  await db.close();
}
