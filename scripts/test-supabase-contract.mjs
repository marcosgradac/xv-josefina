import assert from 'node:assert/strict';
import { createClient } from '@supabase/supabase-js';
import {loadAdminData} from '../src/lib/adminData.ts';
import {balance,totalPeople,totalAmount,TARIFFS,CATEGORIES} from '../src/config/pricing.ts';
const counts={adults:2,teens:1,children:1,infants:1};
assert.equal(totalPeople(counts),5);assert.equal(totalAmount(counts,Object.fromEntries(CATEGORIES.map(k=>[k,TARIFFS[k].price]))),185000);
assert.equal(totalAmount({adults:0,teens:0,children:0,infants:5},{adults:60000,teens:40000,children:25000,infants:0}),0);
let allowed=true;const paths=[];
const row={id:'test',full_name:'PRUEBA LOCAL',phone_country_code:'+54',phone_number:'3571000000',adults_count:2,teens_count:1,children_count:1,under_five_count:1,song_request:null,attendance_status:'confirmed',total_amount:185000,total_guests:5,created_at:'2026-11-17T00:00:00Z',updated_at:'2026-11-17T00:00:00Z',amount_paid:50000,balance_due:135000,payment_status:'partial'};
const client=createClient('https://contract.example.test','public-test',{auth:{persistSession:false,autoRefreshToken:false},global:{fetch:async(url)=>{const path=new URL(url).pathname;paths.push(path);const value=path.endsWith('my_admin_status')?allowed:path.endsWith('rsvp_dashboard')?[row]:path.endsWith('payments')?[]:null;assert.notEqual(value,null,'Unexpected endpoint '+path);return new Response(JSON.stringify(value),{status:200,headers:{'Content-Type':'application/json'}});}}});
client.auth.getUser=async()=>({data:{user:{id:'test-admin'}},error:null});
let result=await loadAdminData(client);assert.equal(result.families[0].phone,'+543571000000');assert.equal(result.families[0].infants,1);assert.equal(result.families[0].song,'');assert.deepEqual(balance(result.families[0]),{paid:50000,due:135000,status:'PAGO PARCIAL'});
row.amount_paid=185000;row.balance_due=0;row.payment_status='paid';result=await loadAdminData(client);assert.deepEqual(balance(result.families[0]),{paid:185000,due:0,status:'PAGADO'});
allowed=false;paths.length=0;await assert.rejects(loadAdminData(client),/permisos/);assert.deepEqual(paths,['/rest/v1/rpc/my_admin_status']);
console.log('OK: cálculo por edades, menores gratis, contrato dashboard, saldos del servidor y bloqueo sin permisos. Transporte simulado; no valida RLS ni pagos remotos.');

const {recordManualPayment}=await import('../src/lib/manualPayments.ts');
const ledger=new Map();let writes=0;let loseResponse=false;
const live={balance_due:185000,attendance_status:'confirmed'};
const paymentClient=createClient('https://payment-contract.example.test','public-test',{auth:{persistSession:false,autoRefreshToken:false},global:{fetch:async(url,options)=>{
  const target=new URL(url);const method=options?.method??'GET';let value;
  if(target.pathname.endsWith('rsvp_dashboard'))value={...live};
  else if(target.pathname.endsWith('payments')&&method==='GET'){const id=target.searchParams.get('id')?.replace('eq.','');value=ledger.has(id)?[ledger.get(id)]:[];}
  else if(target.pathname.endsWith('payments')&&method==='POST'){
    const body=JSON.parse(options.body);assert.equal('recorded_by' in body,false);assert.equal('total_amount' in body,false);assert(body.amount>0&&body.amount<=live.balance_due);
    ledger.set(body.id,body);writes++;live.balance_due-=body.amount;value={id:body.id};if(loseResponse){loseResponse=false;throw new TypeError('Prueba: respuesta perdida después del guardado');}
  }else throw new Error('Endpoint inesperado '+target.pathname);
  return new Response(JSON.stringify(value),{status:200,headers:{'Content-Type':'application/json'}});
}}});
const payment=(id,amount,mode='advance')=>({id,submissionId:'family-test',amount,mode,method:'cash',note:'PRUEBA LOCAL'});
await recordManualPayment(paymentClient,payment('advance-1',50000));assert.equal(live.balance_due,135000);
await recordManualPayment(paymentClient,payment('advance-1',50000));assert.equal(writes,1);
await recordManualPayment(paymentClient,payment('advance-2',30000));assert.equal(live.balance_due,105000);
await assert.rejects(recordManualPayment(paymentClient,payment('stale-full',135000,'full')),/saldo cambió/);assert.equal(writes,2);
await recordManualPayment(paymentClient,payment('final',105000,'full'));assert.equal(live.balance_due,0);assert.equal(writes,3);
await assert.rejects(recordManualPayment(paymentClient,payment('extra',1)),/no tiene un saldo/);
await assert.rejects(recordManualPayment(paymentClient,payment('negative',-5)),/mayor que cero/);
await assert.rejects(recordManualPayment(paymentClient,payment('advance-1',60000)),/datos diferentes/);
live.balance_due=60000;loseResponse=true;try{await recordManualPayment(paymentClient,payment('lost-response',60000,'full'));}catch{}const before=writes;await recordManualPayment(paymentClient,payment('lost-response',60000,'full'));assert.equal(writes,before);assert.equal(live.balance_due,0);
console.log('OK: adelantos 50000 + 30000, restante 105000, rechazo de saldo obsoleto, sin duplicados y recuperación de respuesta perdida. Contrato simulado.');
