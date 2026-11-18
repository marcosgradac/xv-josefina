import {useRef,useState,type FormEvent} from 'react';
import {Dialog} from '@mui/material';
import {money,type Family,type PaymentMethod} from '../config/pricing';
import {requireBackend,errorMessage} from '../lib/backend';
import {recordManualPayment} from '../lib/manualPayments';
type Props={family:Family;mode:'advance'|'full';onClose:()=>void;onSaved:()=>Promise<void>};
export default function ManualPaymentDialog({family,mode,onClose,onSaved}:Props){
  const [amount,setAmount]=useState('');const [method,setMethod]=useState<PaymentMethod>('cash');const [note,setNote]=useState('');const [pending,setPending]=useState(false);const [error,setError]=useState('');
  const busy=useRef(false);const operation=useRef<{fingerprint:string;id:string}|null>(null);
  const full=mode==='full';const value=full?family.balance_due:Number(amount);
  async function save(event:FormEvent){event.preventDefault();if(busy.current)return;setError('');if(!Number.isSafeInteger(value)||value<=0||value>family.balance_due){setError('Ingresá un importe mayor que cero y hasta el saldo pendiente.');return;}
    busy.current=true;setPending(true);
    const description=(full?'Pago restante':'Adelanto')+(note.trim()?' · '+note.trim():'');
    const fingerprint=JSON.stringify({family:family.id,value,method,description,mode});if(operation.current?.fingerprint!==fingerprint)operation.current={fingerprint,id:crypto.randomUUID()};
    try{await recordManualPayment(requireBackend(),{id:operation.current.id,submissionId:family.id,amount:value,method,note:description,mode});await onSaved();onClose();}catch(failure){setError(errorMessage(failure));}finally{busy.current=false;setPending(false);}
  }
  return <Dialog open onClose={()=>{if(!busy.current)onClose();}} aria-labelledby="manual-payment-title" maxWidth="xs" fullWidth scroll="paper" className="manual-payment-dialog" slotProps={{paper:{className:'rsvp-system manual-payment-paper'}}}>
    <form onSubmit={save} aria-busy={pending}><p className="rsvp-eyebrow">Registro manual · XV Josefina</p><h2 id="manual-payment-title">{full?'Confirmar pago completo':'Registrar adelanto'}</h2><h3>{family.full_name}</h3>
      <dl className="payment-overview"><div><dt>Total correspondiente</dt><dd>{money(family.total_amount)}</dd></div><div><dt>Abonado anteriormente</dt><dd>{money(family.amount_paid)}</dd></div><div><dt>Saldo pendiente</dt><dd>{money(family.balance_due)}</dd></div></dl>
      {full?<div className="payment-confirmation-question"><p>¿Confirmás que recibiste el saldo restante de esta familia?</p><strong>{money(family.balance_due)}</strong><p>Se agregará este importe al historial, conservando los pagos anteriores.</p></div>:<label>Importe recibido<input autoFocus required type="number" inputMode="numeric" min="1" step="1" max={family.balance_due} value={amount} onChange={e=>setAmount(e.target.value)} disabled={pending}/></label>}
      <label>Método de pago<select value={method} onChange={e=>setMethod(e.target.value as PaymentMethod)} disabled={pending}><option value="cash">Efectivo</option><option value="transfer">Transferencia</option><option value="other">Otro</option></select></label>
      <label>Observación opcional<textarea maxLength={450} value={note} onChange={e=>setNote(e.target.value)} disabled={pending}/></label><p className="form-hint">Registrá únicamente dinero que ya recibiste. Esta acción no realiza cobros ni transferencias.</p>
      {error&&<p role="alert" className="form-error">{error}</p>}<div className="form-actions"><button className="rsvp-primary" disabled={pending} type="submit">{pending?'Guardando…':full?'SÍ, REGISTRAR SALDO RECIBIDO':'GUARDAR ADELANTO'}</button><button type="button" disabled={pending} onClick={onClose}>Cancelar</button></div>
    </form>
  </Dialog>;
}
