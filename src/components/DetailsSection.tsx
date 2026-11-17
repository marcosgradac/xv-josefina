import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { EVENT } from '../config/event';

export default function DetailsSection({
  ref,
  onScrollTo,
}: {
  ref: React.Ref<HTMLDivElement>;
  onScrollTo: (id: string) => void;
}) {
  return (
    <Box
      ref={ref}
      id="details"
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
          variant="h2"
          component="h2"
          className="script-heading section-heading"
          sx={{
            color: 'var(--gold-light)',
            fontSize: { xs: '3rem', sm: '4.25rem' },
            fontWeight: 400,
            mb: 3,
          }}
        >
          Detalles
        </Typography>
        <Paper
          sx={{
            background: 'rgba(16,16,15,0.78)',
            border: '1px solid',
            borderColor: 'rgba(212,175,55,0.2)',
            borderRadius: 2,
            p: 3,
            backdropFilter: 'blur(10px)',
          }}
        >
          {EVENT.details.map((item, idx) => (
            <Box key={idx} sx={detailRow}>
              <Box
                component="span"
                sx={{
                  mr: 1.5,
                  fontSize: '1.25rem',
                  color: '#D4AF37',
                }}
              >
                ℹ️
              </Box>
              <Typography variant="body1" component="span" sx={{ flex: 1, textAlign: 'left', color: '#f5e1c8' }}>
                {item.label}
              </Typography>
              {item.value && !item.label.toLowerCase().includes('no pagan') && (
                <Typography variant="body1" component="span" sx={{ fontWeight: 700, color: '#ffffff', fontFamily: 'Playfair Display, serif' }}>
                  {item.value}
                </Typography>
              )}
            </Box>
          ))}
        </Paper>
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
            mt: 3,
            m: 'auto',
            display: 'block',
          }}
          onClick={() => onScrollTo('gifts')}
        >
          Mesa de regalos
        </Button>
      </Box>
    </Box>
  );
}

const detailRow = {
  display: 'flex',
  alignItems: 'center',
  py: 1.5,
  borderBottom: '1px solid',
  borderColor: 'rgba(212,175,55,0.1)',
  '&:last-child': { borderBottom: 'none' },
};

