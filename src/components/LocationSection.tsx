import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { EVENT } from '../config/event';

export default function LocationSection({
  ref,
}: {
  ref: React.Ref<HTMLDivElement>;
  onScrollTo: (id: string) => void;
}) {
  return (
    <Box
      ref={ref}
      id="location"
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
          Detalles de la celebración
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
          Dónde será
        </Typography>
        <Paper
          sx={{
            background: 'rgba(16,16,15,0.78)',
            border: '1px solid',
            borderColor: 'rgba(212,175,55,0.2)',
            borderRadius: 2,
            p: 3,
            backdropFilter: 'blur(10px)',
            mb: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center', mb: 2 }}>
            <Box sx={{ p: 1, borderRadius: 1, border: '1px solid', borderColor: 'rgba(212,175,55,0.3)' }}>
              📍
            </Box>
            <Typography variant="body1" component="span" sx={{ color: '#ffffff', fontWeight: 700, fontFamily: 'Playfair Display, serif' }}>
              {EVENT.venueName}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Box sx={{ p: 1, borderRadius: 1, border: '1px solid', borderColor: 'rgba(212,175,55,0.3)' }}>
              📅
            </Box>
            <Typography variant="body1" component="span" sx={{ color: '#f6efe8' }}>
              {EVENT.eventDateLabel}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center', mb: 0 }}>
            <Box sx={{ p: 1, borderRadius: 1, border: '1px solid', borderColor: 'rgba(212,175,55,0.3)' }}>
              🕐
            </Box>
            <Typography variant="body1" component="span" sx={{ color: '#f6efe8', fontWeight: 700 }}>
              {EVENT.eventTime}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

