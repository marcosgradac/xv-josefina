import React, { useState } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { EVENT } from '../config/event';

export default function GallerySection({
  ref,
  onScrollTo,
}: {
  ref: React.Ref<HTMLDivElement>;
  onScrollTo: (id: string) => void;
}) {
  const [current, setCurrent] = useState(0);
  const totalPhotos = EVENT.gallery.length;

  const showPhoto = (index: number) => {
    setCurrent((index + totalPhotos) % totalPhotos);
  };

  return (
    <Box
      ref={ref}
      id="gallery"
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
      <Box sx={{ position: 'relative', zIndex: 2, maxWidth: 900, mx: 'auto', width: '100%' }}>
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
          Recuerdos para guardar
        </Typography>
        <Typography
          variant="h2"
          component="h2"
          className="script-heading section-heading"
          sx={{
            fontSize: { xs: '3rem', sm: '4.25rem' },
            fontWeight: 400,
            color: 'var(--gold-light)',
            mb: 3,
            textAlign: 'center',
          }}
        >
          Galería
        </Typography>
        <Box
          sx={{
            position: 'relative',
            width: 'min(100%, 30rem)',
            mx: 'auto',
            aspectRatio: { xs: '3 / 4', sm: '4 / 5' },
            borderRadius: 3,
            overflow: 'hidden',
            backgroundColor: 'rgba(255,255,255,0.05)',
            mb: 3,
            border: '1px solid',
            borderColor: 'rgba(212,175,55,0.2)',
          }}
        >
          {EVENT.gallery.map((photo, idx) => (
            <img
              key={idx}
              src={photo.url}
              alt={idx === current ? photo.caption || `Foto ${idx + 1} de la galería` : ''}
              aria-hidden={idx !== current}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              opacity: idx === current ? 1 : 0,
                transition: 'opacity 0.6s ease-in-out',
              }}
              decoding="async"
              loading="lazy"
            />
          ))}
          {totalPhotos > 1 && (
            <>
              <IconButton
                aria-label="Foto anterior"
                onClick={() => showPhoto(current - 1)}
                sx={galleryControlSx('left')}
              >
                ‹
              </IconButton>
              <IconButton
                aria-label="Foto siguiente"
                onClick={() => showPhoto(current + 1)}
                sx={galleryControlSx('right')}
              >
                ›
              </IconButton>
            </>
          )}
          <Box
            sx={{
              position: 'absolute',
              bottom: 12,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 1,
            }}
          >
            {EVENT.gallery.map((_, idx) => (
              <IconButton
                key={idx}
                aria-label={`Ver foto ${idx + 1}`}
                aria-current={idx === current ? 'true' : undefined}
                onClick={() => showPhoto(idx)}
                sx={{
                  width: 22,
                  height: 22,
                  p: 0,
                  '&::before': {
                    content: '""',
                    width: idx === current ? 9 : 7,
                    height: idx === current ? 9 : 7,
                    borderRadius: '50%',
                    backgroundColor: idx === current ? 'var(--gold-light)' : 'rgba(255,255,255,0.5)',
                  },
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </Box>
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
          onClick={() => onScrollTo('countdown')}
        >
          Ver cuenta regresiva
        </Button>
      </Box>
    </Box>
  );
}

const galleryControlSx = (side: 'left' | 'right') => ({
  position: 'absolute',
  top: '50%',
  [side]: { xs: 8, sm: 14 },
  transform: 'translateY(-50%)',
  width: 40,
  height: 40,
  color: 'var(--text-light)',
  fontSize: '2rem',
  fontFamily: 'var(--serif)',
  backgroundColor: 'rgba(5, 5, 5, 0.44)',
  border: '1px solid rgba(236, 211, 159, 0.55)',
  '&:hover': { backgroundColor: 'rgba(201, 163, 94, 0.35)' },
});

