import type { SupabaseClient } from '@supabase/supabase-js';
import { requireBackend } from './backend.ts';
import type { Family, Payment } from '../config/pricing';
import type { DashboardRow, PaymentRow } from '../types/supabase';
async function readAll<T>(client:SupabaseClient,table:string):Promise<T[]> {
  const rows:T[]=[];
  for(let offset=0;;offset+=500){const {data,error}=await client.from(table).select('*').order('created_at',{ascending:false}).order('id').range(offset,offset+499);if(error)throw error;rows.push(...data as T[]);if(data.length<500)return rows;}
}
export async function loadAdminData(client:SupabaseClient=requireBackend()){
  const {data:identity,error:authError}=await client.auth.getUser();
  if(authError||!identity.user)throw new Error('Tu sesión caducó. Volvé a iniciar sesión.');
  const {data:allowed,error}=await client.rpc('my_admin_status');
  if(error)throw error;if(allowed!==true)throw new Error('Tu cuenta no tiene permisos de administrador para este evento.');
  const [familiesRaw,paymentsRaw]=await Promise.all([readAll<DashboardRow>(client,'rsvp_dashboard'),readAll<PaymentRow>(client,'payments')]);
  const families:Family[]=familiesRaw.map(row=>({id:row.id,full_name:row.full_name,phone_country_code:row.phone_country_code,phone_number:row.phone_number,phone:row.phone_country_code+row.phone_number,adults:Number(row.adults_count),teens:Number(row.teens_count),children:Number(row.children_count),infants:Number(row.under_five_count),song:row.song_request??'',attendance:row.attendance_status,total_amount:Number(row.total_amount),total_guests:Number(row.total_guests),created_at:row.created_at,updated_at:row.updated_at,amount_paid:Number(row.amount_paid),balance_due:Number(row.balance_due),payment_status:row.payment_status}));
  const payments:Payment[]=paymentsRaw.map(row=>({id:row.id,response_id:row.submission_id,amount:Number(row.amount),note:row.note??'',created_at:row.created_at,payment_method:row.payment_method}));
  return {families,payments};
}
