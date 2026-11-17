import { useState, type FormEvent, type Ref } from 'react';
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { EVENT } from '../config/event';

type ResponseState = 'confirmed' | 'declined' | null;
const countryCodes = [
  { value: '+54', label: 'Argentina +54' }, { value: '+55', label: 'Brasil +55' }, { value: '+56', label: 'Chile +56' },
  { value: '+57', label: 'Colombia +57' }, { value: '+52', label: 'México +52' }, { value: '+598', label: 'Uruguay +598' },
];

export default function RSVPSection({ ref }: { ref: Ref<HTMLDivElement> }) {
  const [form, setForm] = useState({ name: '', countryCode: '+54', phone: '', guests: 1, song: '' });
  const [response, setResponse] = useState<ResponseState>(null);
  const [validationMessage, setValidationMessage] = useState('');
  const handleConfirm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) { setValidationMessage('Por favor, completa tu nombre y teléfono para confirmar.'); setResponse(null); return; }
    setValidationMessage(''); setResponse('confirmed');
  };
  const handleDecline = () => { setValidationMessage(''); setResponse('declined'); };

  return <Box ref={ref} id="rsvp" component="section" className="invitation-section" sx={sectionSx}>
    <Box sx={overlaySx} />
    <Box sx={contentSx}>
      <Typography variant="caption" component="div" sx={eyebrowSx}>{EVENT.rsvpEyebrow}</Typography>
      <Typography variant="h2" component="h2" className="script-heading" sx={headingSx}>{EVENT.rsvpTitle}</Typography>
      <Typography component="p" sx={bodySx}>{EVENT.rsvpStory}</Typography>
      <Paper sx={passSx}><Typography component="p" sx={{ color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.18em', fontSize: '0.73rem', m: 0 }}>Pase de invitación</Typography><Typography component="p" className="playfair" sx={{ color: 'var(--text-light)', fontSize: { xs: '1.15rem', sm: '1.35rem' }, m: '0.5rem 0 0' }}>{EVENT.rsvpPassDateTime}</Typography></Paper>
      <Paper sx={formPaperSx}>
        <Box component="form" noValidate onSubmit={handleConfirm} sx={{ display: 'grid', gap: 2 }}>
          <TextField required fullWidth label="Nombre completo" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} sx={fieldSx} />
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '180px 1fr' }, gap: 1.5 }}>
            <FormControl fullWidth sx={fieldSx}><InputLabel id="country-code-label">Código</InputLabel><Select labelId="country-code-label" label="Código" value={form.countryCode} onChange={(event) => setForm({ ...form, countryCode: event.target.value })}>{countryCodes.map((country) => <MenuItem key={country.value} value={country.value}>{country.label}</MenuItem>)}</Select></FormControl>
            <TextField required fullWidth type="tel" label="Teléfono" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} sx={fieldSx} />
          </Box>
          <Box sx={guestStepperSx}><Typography component="span" sx={{ color: 'var(--text-light)' }}>Cantidad de invitados</Typography><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><IconButton aria-label="Restar un invitado" disabled={form.guests === 1} onClick={() => setForm({ ...form, guests: Math.max(1, form.guests - 1) })} sx={stepperButtonSx}>−</IconButton><Typography aria-live="polite" component="span" sx={{ color: 'var(--gold-light)', minWidth: '1.5rem', textAlign: 'center', fontWeight: 700 }}>{form.guests}</Typography><IconButton aria-label="Sumar un invitado" onClick={() => setForm({ ...form, guests: form.guests + 1 })} sx={stepperButtonSx}>+</IconButton></Box></Box>
          <TextField fullWidth label="Petición de canción" value={form.song} onChange={(event) => setForm({ ...form, song: event.target.value })} sx={fieldSx} />
          {validationMessage && <Typography role="alert" component="p" sx={validationSx}>{validationMessage}</Typography>}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.25 }}><Button className="gold-control" type="submit" sx={confirmButtonSx}>Confirmar</Button><Button className="gold-control" type="button" variant="outlined" onClick={handleDecline} sx={declineButtonSx}>No puedo asistir</Button></Box>
        </Box>
        {response && <Typography aria-live="polite" role="status" component="p" sx={responseSx}>{response === 'confirmed' ? EVENT.rsvpConfirmedMessage : EVENT.rsvpDeclinedMessage}</Typography>}
      </Paper>
      <Typography component="p" sx={localNoticeSx}>Vista previa local: esta respuesta no se envía a Josefina ni al anfitrión y se perderá al salir o recargar la página.</Typography>
    </Box>
  </Box>;
}

const sectionSx = { minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', px: { xs: 2.5, sm: 4 }, py: 6, backgroundColor: 'var(--bg)' };
const overlaySx = { position: 'absolute', inset: 0, background: 'rgba(5, 5, 5, 0.8)' };
const contentSx = { position: 'relative', zIndex: 1, maxWidth: 650, width: '100%', mx: 'auto', textAlign: 'center' };
const eyebrowSx = { color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.25em', fontFamily: 'var(--sans)', fontSize: '0.73rem', mb: 1 };
const headingSx = { color: 'var(--gold-light)', fontSize: { xs: '3rem', sm: '4.25rem' }, fontWeight: 400, mb: 1 };
const bodySx = { color: 'var(--subtitle-light)', lineHeight: 1.7, fontSize: { xs: '0.98rem', sm: '1.08rem' }, mb: 2.5 };
const passSx = { background: 'rgba(16, 16, 15, 0.8)', border: '1px solid var(--gold-line)', borderRadius: 2, py: 1.75, px: 2, mb: 2 };
const formPaperSx = { background: 'rgba(16, 16, 15, 0.84)', border: '1px solid var(--gold-line)', borderRadius: 2, p: { xs: 2, sm: 3 }, textAlign: 'left', backdropFilter: 'blur(10px)' };
const fieldSx = { '& .MuiInputLabel-root': { color: 'var(--text-dim)' }, '& .MuiInputLabel-root.Mui-focused': { color: 'var(--gold-light)' }, '& .MuiOutlinedInput-root': { color: 'var(--text-light)', '& fieldset': { borderColor: 'var(--gold-line)' }, '&:hover fieldset': { borderColor: 'var(--gold)' }, '&.Mui-focused fieldset': { borderColor: 'var(--gold-light)' } }, '& .MuiSvgIcon-root': { color: 'var(--gold-light)' } };
const guestStepperSx = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid var(--gold-line)', borderRadius: 1, px: 1.5, py: 0.5 };
const stepperButtonSx = { color: 'var(--gold-light)', border: '1px solid var(--gold-line)', borderRadius: 1, '&:hover': { background: 'rgba(201, 163, 94, 0.12)' }, '&.Mui-disabled': { color: 'var(--text-dim)', borderColor: 'rgba(251, 243, 229, 0.16)' } };
const validationSx = { color: '#ffcabd', m: 0, fontSize: '0.9rem' };
const confirmButtonSx = { background: 'var(--gold)', color: 'var(--bg)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.13em', py: 1.1, '&:hover': { background: 'var(--gold-light)' } };
const declineButtonSx = { borderColor: 'var(--gold)', color: 'var(--gold-light)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', '&:hover': { borderColor: 'var(--gold-light)', background: 'rgba(201, 163, 94, 0.12)' } };
const responseSx = { color: 'var(--gold-light)', textAlign: 'center', lineHeight: 1.6, mb: 0, mt: 2.5 };
const localNoticeSx = { color: 'var(--text-dim)', fontSize: '0.78rem', lineHeight: 1.55, mt: 1.5, mb: 0 };
