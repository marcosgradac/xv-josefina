import type { SupabaseClient } from '@supabase/supabase-js';
import type { PaymentMethod } from '../config/pricing';
export type ManualPaymentInput={id:string;submissionId:string;amount:number;method:PaymentMethod;note:string;mode:'advance'|'full'};
export async function recordManualPayment(client:SupabaseClient,input:ManualPaymentInput){
  if(!Number.isSafeInteger(input.amount)||input.amount<=0)throw new Error('Ingresá un importe recibido mayor que cero, en pesos enteros.');
  const payment={id:input.id,submission_id:input.submissionId,amount:input.amount,payment_method:input.method,note:input.note.trim()||null};
  async function existingPayment(){const {data,error}=await client.from('payments').select('id,submission_id,amount,payment_method,note').eq('id',payment.id).maybeSingle();if(error)throw error;if(data&&(data.submission_id!==payment.submission_id||Number(data.amount)!==payment.amount||data.payment_method!==payment.payment_method||(data.note??null)!==payment.note))throw new Error('Esta operación ya se usó con datos diferentes. Actualizá la familia.');return data;}
  // Recover the result of a previous attempt before checking its now-reduced balance.
  const previous=await existingPayment();if(previous)return previous.id;
  const {data:family,error:readError}=await client.from('rsvp_dashboard').select('balance_due,attendance_status').eq('id',input.submissionId).single();if(readError)throw readError;
  const due=Number(family.balance_due);
  if(family.attendance_status!=='confirmed'||due<=0)throw new Error('Esta familia no tiene un saldo pendiente para registrar pagos. Actualizá la información.');
  if(input.amount>due||(input.mode==='full'&&input.amount!==due))throw new Error('El saldo cambió. Cerrá este formulario y actualizá la familia antes de confirmar el importe recibido.');
  const {data,error}=await client.from('payments').insert(payment).select('id').single();
  if(error?.code==='23505'){const duplicate=await existingPayment();if(duplicate)return duplicate.id;}
  if(error)throw error;if(!data?.id)throw new Error('No se recibió el comprobante. Reintentá la misma operación sin cambiar los datos.');return data.id;
}
