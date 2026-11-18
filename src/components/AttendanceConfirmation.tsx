import { Dialog } from '@mui/material';
import { money } from '../config/pricing';
import './AttendanceConfirmation.css';
type Props={open:boolean;amount:number;guests:number;onClose:()=>void};
export default function AttendanceConfirmation({open,amount,guests,onClose}:Props){
  return <Dialog open={open} onClose={onClose} aria-labelledby="attendance-confirmed-title" aria-describedby="attendance-confirmed-message" scroll="paper" maxWidth="xs" fullWidth className="attendance-dialog" slotProps={{paper:{className:'rsvp-system attendance-confirmation'},backdrop:{className:'attendance-backdrop'}}}>
    <div className="confirmation-sparkles" aria-hidden="true">✦ <span>✧</span> ✦</div>
    <p className="rsvp-eyebrow">XV Josefina · {guests} {guests===1?'invitado':'invitados'}</p>
    <h2 id="attendance-confirmed-title">¡Asistencia confirmada!</h2>
    <p id="attendance-confirmed-message">¡Muchas gracias por confirmar! Nos encantará compartir esta noche especial con vos.</p>
    <div className="confirmed-amount"><span>TOTAL A ABONAR</span><strong>{money(amount)}</strong></div>
    {amount>0?<div className="confirmed-payment-notice"><h3>IMPORTANTE SOBRE EL PAGO</h3><p>El pago deberá realizarse directamente a la persona encargada de la organización del cumpleaños. Podés abonar el importe completo o realizar un adelanto.</p><p>La persona encargada registrará los pagos recibidos. Hasta entonces, el importe permanecerá pendiente.</p></div>:<p>No tenés un importe a abonar. Los menores de cinco años no pagan.</p>}
    <button type="button" className="rsvp-primary" autoFocus onClick={onClose}>ENTENDIDO</button>
  </Dialog>;
}
