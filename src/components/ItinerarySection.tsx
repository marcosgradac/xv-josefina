import React from 'react';
import { Box, Typography } from '@mui/material';
import { EVENT } from '../config/event';

const ICON_MAP: Record<string, string> = {
  dinner: '🍽️',
  music: '♫',
  party: '✦',
};

export default function ItinerarySection({ ref }: { ref: React.Ref<HTMLDivElement> }) {
  return (
    <Box ref={ref} id="itinerary" component="section" className="program-section" aria-labelledby="program-title">
      <div className="program-star program-star-one" aria-hidden="true">✦</div>
      <div className="program-star program-star-two" aria-hidden="true">✧</div>
      <div className="program-star program-star-three" aria-hidden="true">✦</div>
      <div className="program-star program-star-four" aria-hidden="true">✧</div>
      <Box className="program-content">
        <Typography variant="caption" component="p" className="section-eyebrow program-eyebrow">
          Cada momento será especial
        </Typography>
        <Typography
          id="program-title"
          variant="h2"
          component="h2"
          className="script-heading program-heading"
          sx={{
            color: 'var(--gold-light)',
            fontFamily: 'var(--script)',
            fontSize: { xs: 'clamp(2rem, 9vw, 2.65rem)', sm: '3.25rem' },
            fontWeight: 400,
            lineHeight: 1.15,
            whiteSpace: 'nowrap',
            textAlign: 'center',
          }}
        >
          Programa del día
        </Typography>
        <Box component="ol" className="program-timeline">
          <svg className="program-timeline-line" viewBox="0 0 100 540" preserveAspectRatio="none" aria-hidden="true">
            <path d="M50 22 C9 92 91 128 50 196 S9 304 50 370 S91 458 50 522" />
          </svg>
          {EVENT.itinerary.map((item) => (
            <Box component="li" key={`${item.time}-${item.title}`} className="program-item">
              <Box className="program-marker" aria-hidden="true">{ICON_MAP[item.icon] || '✦'}</Box>
              <Box className="program-card">
                <Typography component="p" className="program-time">{item.time} HRS</Typography>
                <Typography component="h3" className="program-card-title">{item.title}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
