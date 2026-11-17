import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { EVENT } from '../config/event';

export default function CountdownSection({
  ref,
  onScrollTo,
}: {
  ref: React.Ref<HTMLDivElement>;
  onScrollTo: (id: string) => void;
}) {
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number }>({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const target = new Date(EVENT.eventDate).getTime();
    const tick = () => {
      const now = Date.now();
      const diff = target - now;
      if (diff <= 0) {
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
        return;
      }
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ d, h, m, s });
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      ref={ref}
      id="countdown"
      component="section"
      className="invitation-section"
      sx={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        padding: { xs: 2.5, sm: 4 },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(5,5,5,0.68)',
        }}
      />
      <Box sx={{ position: 'relative', zIndex: 2, maxWidth: 700, mx: 'auto', width: '100%', textAlign: 'center' }}>
        <Typography
          variant="caption"
          component="div"
          sx={{
            color: '#D4AF37',
            textTransform: 'uppercase',
            letterSpacing: '0.4em',
            fontSize: '0.75rem',
            opacity: 0.5,
            fontFamily: 'Montserrat, sans-serif',
            mb: 1,
          }}
        >
          Ya falta menos
        </Typography>
        <Typography
          variant="h2"
          component="h2"
          className="script-heading section-heading"
          sx={{
            fontSize: { xs: '3rem', sm: '4.25rem' },
            fontWeight: 400,
            color: 'var(--gold-light)',
            mb: 1,
          }}
        >
          La cuenta regresiva
        </Typography>
        <Typography
          variant="subtitle1"
          component="div"
          sx={{
            color: '#f6efe8',
            fontSize: { xs: '0.95rem', sm: '1.1rem' },
            mb: 4,
            opacity: 0.9,
          }}
        >
          ¡Cada día está más cerca!
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, mb: 4 }}>
          {[
            { label: 'DÍAS', value: timeLeft.d },
            { label: 'HORAS', value: timeLeft.h },
            { label: 'MINUTOS', value: timeLeft.m },
            { label: 'SEGUNDOS', value: timeLeft.s },
          ].map((item) => (
            <Box key={item.label} sx={minimalBox}>
              <Typography variant="h3" component="div" className="playfair" sx={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff', lineHeight: 1 }}>
                {String(item.value).padStart(2, '0')}
              </Typography>
              <Typography variant="caption" component="div" sx={{ fontFamily: 'Montserrat, sans-serif', color: '#D4AF37', textTransform: 'uppercase', letterSpacing: '0.3em', opacity: 0.7, fontSize: '0.65rem' }}>
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box>
        <Button
          sx={{
            bgcolor: '#D4AF37',
            color: '#0b0b14',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            fontSize: '0.85rem',
            py: 1,
            px: 3,
            '&:hover': { bgcolor: '#e0bf90' },
            m: 'auto',
            display: 'block',
          }}
          onClick={() => onScrollTo('details')}
        >
          Ver detalles
        </Button>
      </Box>
    </Box>
  );
}

const minimalBox = {
  minWidth: '60px',
  textAlign: 'center',
  px: 1,
};

