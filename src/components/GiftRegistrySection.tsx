import { useState, type Ref } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { EVENT } from '../config/event';

export default function GiftRegistrySection({ ref, onScrollTo }: { ref: Ref<HTMLDivElement>; onScrollTo: (id: string) => void }) {
  const [copyMessage, setCopyMessage] = useState('');
  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(EVENT.alias); setCopyMessage('CLABE copiada al portapapeles.'); }
    catch { setCopyMessage('No se pudo copiar la CLABE. Puedes seleccionarla manualmente.'); }
  };

  return <Box ref={ref} id="gifts" component="section" className="invitation-section" sx={sectionSx}>
    <Box sx={overlaySx} />
    <Box sx={contentSx}>
      <Typography variant="caption" component="div" sx={eyebrowSx}>Un detalle especial</Typography>
      <Typography component="h2" className="script-heading" sx={sectionHeadingSx}>{EVENT.giftHeading}</Typography>
      <Typography variant="subtitle1" component="p" sx={messageSx}>{EVENT.giftMessage}</Typography>
      <Paper sx={paperSx}>
        <Typography component="h2" className="script-heading" sx={cardHeadingSx}>{EVENT.digitalEnvelopeTitle}</Typography>
        <Box sx={{ display: 'grid', gap: 1.25, textAlign: 'left' }}>
          <Typography component="p" sx={detailSx}>Banco: <Box component="span" sx={valueSx}>{EVENT.bankName}</Box></Typography>
          <Box><Typography component="p" sx={labelSx}>CLABE</Typography><Typography component="p" sx={{ ...valueSx, overflowWrap: 'anywhere' }}>{EVENT.alias}</Typography></Box>
          <Box><Typography component="p" sx={labelSx}>Beneficiario</Typography><Typography component="p" sx={valueSx}>{EVENT.accountHolder}</Typography></Box>
        </Box>
        <Button className="gold-control" variant="outlined" onClick={handleCopy} sx={copyButtonSx}>Copiar CLABE</Button>
        <Typography aria-live="polite" component="p" sx={{ minHeight: '1.5em', color: 'var(--gold-light)', fontSize: '0.82rem', mt: 1.25, mb: 0 }}>{copyMessage}</Typography>
      </Paper>
      <Paper sx={{ ...paperSx, mt: 2 }}>
        <Typography component="h2" className="script-heading" sx={cardHeadingSx}>{EVENT.envelopeRainTitle}</Typography>
        <Typography component="p" sx={{ ...messageSx, mb: 0 }}>{EVENT.envelopeRainMessage}</Typography>
      </Paper>
      <Button className="gold-control" onClick={() => onScrollTo('location')} sx={primaryButtonSx}>Ver ubicación</Button>
    </Box>
  </Box>;
}

const sectionSx = { minHeight: '100vh', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', px: { xs: 2.5, sm: 4 }, py: 6, backgroundColor: 'var(--bg)' };
const overlaySx = { position: 'absolute', inset: 0, background: 'rgba(5, 5, 5, 0.8)' };
const contentSx = { position: 'relative', zIndex: 1, maxWidth: 620, width: '100%', mx: 'auto', textAlign: 'center' };
const eyebrowSx = { color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.32em', fontSize: '0.75rem', fontFamily: 'var(--sans)', mb: 1.5 };
const sectionHeadingSx = { color: 'var(--gold-light)', fontSize: { xs: '3rem', sm: '4.25rem' }, fontWeight: 400, lineHeight: 1.05, mt: 0, mb: 1.5 };
const messageSx = { color: 'var(--subtitle-light)', fontSize: { xs: '0.98rem', sm: '1.08rem' }, lineHeight: 1.7, mb: 3 };
const paperSx = { background: 'rgba(16, 16, 15, 0.78)', border: '1px solid var(--gold-line)', borderRadius: 2, p: { xs: 2.5, sm: 3 }, backdropFilter: 'blur(10px)' };
const cardHeadingSx = { color: 'var(--gold-light)', fontSize: { xs: '2.35rem', sm: '3rem' }, fontWeight: 400, mb: 2 };
const detailSx = { color: 'var(--subtitle-light)', m: 0 };
const labelSx = { color: 'var(--text-dim)', fontFamily: 'var(--sans)', fontSize: '0.76rem', letterSpacing: '0.18em', textTransform: 'uppercase', mb: 0.25 };
const valueSx = { color: 'var(--text-light)', fontWeight: 700, m: 0 };
const copyButtonSx = { mt: 2.5, borderColor: 'var(--gold)', color: 'var(--gold-light)', letterSpacing: '0.12em', '&:hover': { borderColor: 'var(--gold-light)', background: 'rgba(201, 163, 94, 0.12)' } };
const primaryButtonSx = { mt: 3, alignSelf: 'center', background: 'var(--gold)', color: 'var(--bg)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', px: 3, py: 1.15, '&:hover': { background: 'var(--gold-light)' } };
