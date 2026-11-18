import { useRef, useState, type FormEvent } from 'react';
import { Dialog } from '@mui/material';
import { money, type Family } from '../config/pricing';
import { archiveFamily } from '../lib/adminData';
import { errorMessage } from '../lib/backend';

type Props = {
  family: Family;
  onClose: () => void;
  onArchived: () => void;
};

export default function ArchiveFamilyDialog({ family, onClose, onArchived }: Props) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const busy = useRef(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (busy.current) return;
    busy.current = true;
    setPending(true);
    setError('');
    try {
      await archiveFamily(family);
    } catch (failure) {
      setError(errorMessage(failure));
      return;
    } finally {
      busy.current = false;
      setPending(false);
    }
    onArchived();
  }

  return (
    <Dialog
      open
      onClose={() => { if (!busy.current) onClose(); }}
      aria-labelledby="archive-family-title"
      aria-describedby="archive-family-notice"
      maxWidth="xs"
      fullWidth
      scroll="paper"
      className="manual-payment-dialog"
      slotProps={{ paper: { className: 'rsvp-system manual-payment-paper archive-family-paper' } }}
    >
      <form onSubmit={submit} aria-busy={pending}>
        <h2 id="archive-family-title">Eliminar asistencia</h2>
        <h3>{family.full_name}</h3>
        <dl className="payment-overview">
          <div><dt>Integrantes</dt><dd>{family.total_guests}</dd></div>
          <div><dt>Pagado</dt><dd>{money(family.amount_paid)}</dd></div>
        </dl>
        <p id="archive-family-notice">
          {family.amount_paid > 0
            ? `¿Confirmás que querés eliminar esta asistencia y registrar la devolución de ${money(family.amount_paid)} correspondiente al dinero recibido? Confirmá únicamente si ese dinero ya fue devuelto`
            : '¿Confirmás que querés eliminar esta asistencia y retirar a sus integrantes del evento?'}
        </p>
        {error && <p className="form-error" role="alert">{error}</p>}
        <div className="form-actions">
          <button type="button" disabled={pending} onClick={onClose}>Cancelar</button>
          <button className="admin-archive-button" type="submit" disabled={pending}>
            {pending ? 'Archivando…' : 'Confirmar eliminación'}
          </button>
        </div>
      </form>
    </Dialog>
  );
}
