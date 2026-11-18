import type { SupabaseClient } from '@supabase/supabase-js';
import { requireBackend } from './backend.ts';
import type { Family, Payment } from '../config/pricing';
import type { DashboardRow, PaymentRow } from '../types/supabase';

export type RefundMovement = {
  id: string;
  submission_id: string;
  family_name: string;
  amount: number;
  created_at: string;
};
async function readAll<T>(client: SupabaseClient, table: string, familyIds?: string[]): Promise<T[]> {
  const rows: T[] = [];
  for (let offset = 0; ; offset += 500) {
    let query = client.from(table).select('*');
    if (familyIds) query = query.in('submission_id', familyIds);
    const { data, error } = await query.order('created_at', { ascending: false }).order('id').range(offset, offset + 499);
    if (error) throw error;
    rows.push(...data as T[]);
    if (data.length < 500) return rows;
  }
}

async function readActivePayments(client: SupabaseClient, familyIds: string[]) {
  const payments: PaymentRow[] = [];
  for (let offset = 0; offset < familyIds.length; offset += 50) {
    const batch = await readAll<PaymentRow>(client, 'payments', familyIds.slice(offset, offset + 50));
    payments.push(...batch);
  }
  return payments.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at) || a.id.localeCompare(b.id));
}

export async function archiveFamily(
  family: Pick<Family, 'id' | 'updated_at' | 'amount_paid'>,
  client: SupabaseClient = requireBackend(),
) {
  const { error } = await client.rpc('archive_rsvp_with_refund', {
    p_id: family.id,
    p_updated_at: family.updated_at,
    p_confirmed_paid: family.amount_paid,
  });
  if (error?.code === 'P0001') throw new Error(error.message);
  if (error?.code === 'PGRST202') throw new Error('El archivado con devolución todavía no está habilitado en Supabase.');
  if (error) throw error;
}
export async function loadAdminData(client:SupabaseClient=requireBackend()){
  const {data:identity,error:authError}=await client.auth.getUser();
  if(authError||!identity.user)throw new Error('Tu sesión caducó. Volvé a iniciar sesión.');
  const {data:allowed,error}=await client.rpc('my_admin_status');
  if(error)throw error;if(allowed!==true)throw new Error('Tu cuenta no tiene permisos de administrador para este evento.');
  const familiesRaw = await readAll<DashboardRow>(client, 'rsvp_dashboard');
  const refundsRaw = await readAll<RefundMovement>(client, 'rsvp_refunds').catch((failure: unknown) => {
    // Allow the existing panel to load while the migration is awaiting review.
    if (typeof failure === 'object' && failure !== null && 'code' in failure && failure.code === 'PGRST205') return [];
    throw failure;
  });
  const activeIds = familiesRaw.map(row => row.id);
  const paymentsRaw = await readActivePayments(client, [...new Set([...activeIds, ...refundsRaw.map(row => row.submission_id)])]);
  const families:Family[]=familiesRaw.map(row=>({id:row.id,full_name:row.full_name,phone_country_code:row.phone_country_code,phone_number:row.phone_number,phone:row.phone_country_code+row.phone_number,adults:Number(row.adults_count),teens:Number(row.teens_count),children:Number(row.children_count),infants:Number(row.under_five_count),song:row.song_request??'',attendance:row.attendance_status,total_amount:Number(row.total_amount),total_guests:Number(row.total_guests),created_at:row.created_at,updated_at:row.updated_at,amount_paid:Number(row.amount_paid),balance_due:Number(row.balance_due),payment_status:row.payment_status}));
  const payments:Payment[]=paymentsRaw.map(row=>({id:row.id,response_id:row.submission_id,amount:Number(row.amount),note:row.note??'',created_at:row.created_at,payment_method:row.payment_method}));
  const refunds = refundsRaw.map(row => ({ ...row, amount: Number(row.amount) }));
  return {families,payments,refunds};
}
