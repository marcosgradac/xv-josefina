import { Box, Typography, Button } from '@mui/material';
import { EVENT } from '../config/event';
import '../App.css';

export default function HeroSection({
  ref,
  onScrollTo,
}: {
  ref: React.Ref<HTMLDivElement>;
  onScrollTo: (id: string) => void;
}) {
  return (
    <Box
      ref={ref}
      id="hero"
      tabIndex={-1}
      sx={{
        minHeight: '100svh',
        position: 'relative',
        isolation: 'isolate',
        background: '#050505',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: { xs: 2, sm: 4 },
        overflow: 'hidden',
        color: 'var(--text-light)',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          opacity: 0.4,
          backgroundImage:
            'radial-gradient(circle, rgba(236,211,159,0.6) 0 1px, transparent 1.5px), radial-gradient(circle, rgba(201,163,94,0.4) 0 1px, transparent 1.6px)',
          backgroundPosition: '10% 10%, 80% 40%',
          backgroundSize: '150px 150px, 260px 260px',
        },
      }}
    >
      <div className="cover-glint cover-glint-one" aria-hidden="true">✦</div>
      <div className="cover-glint cover-glint-two" aria-hidden="true">✧</div>
      <div className="cover-glint cover-glint-three" aria-hidden="true">✦</div>

      <svg
        className="decorative-line"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'none',
          overflow: 'visible',
        }}
      >
        <path
          d="M 20 250 Q 500 100 980 250 T 20 250"
          stroke="rgba(201,163,94,0.25)"
          strokeWidth={1.5}
          fill="none"
        />
        <circle cx={20} cy={250} r={2} fill="#c9a35e" opacity={0.6} />
        <circle cx={500} cy={120} r={2.5} fill="#ecd39f" opacity={0.7} />
        <circle cx={980} cy={250} r={2} fill="#c9a35e" opacity={0.6} />
        <circle cx={320} cy={180} r={1.5} fill="#c9a35e" opacity={0.5} />
        <circle cx={680} cy={200} r={1.5} fill="#ecd39f" opacity={0.5} />
        <circle cx={150} cy={320} r={2} fill="#c9a35e" opacity={0.6} />
        <circle cx={850} cy={320} r={2} fill="#ecd39f" opacity={0.6} />
      </svg>

      <div className="cover-frame" aria-hidden="true">
        <span /><span /><span /><span />
      </div>

      <Box
        sx={{
          position: 'relative',
          zIndex: 3,
          maxWidth: 700,
          width: '100%',
          px: { xs: 3, sm: 6 },
          py: { xs: 4, sm: 6 },
          textAlign: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{
            color: '#c9a35e',
            textTransform: 'uppercase',
            letterSpacing: '0.4em',
            fontSize: '0.75rem',
            opacity: 0.6,
            fontFamily: 'var(--sans)',
            marginBottom: 1.5,
            display: 'block',
          }}
        >
          Mis XV
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mb: 2 }}>
          <Box component="span" sx={{ color: '#ecd39f', fontSize: '1.2rem' }}>✦</Box>
          <Box component="span" sx={{ color: '#c9a35e', fontSize: '1rem' }}>•</Box>
          <Box component="span" sx={{ color: '#ecd39f', fontSize: '1.2rem' }}>✦</Box>
        </Box>
        <Typography
          variant="subtitle1"
          component="div"
          sx={{
            color: '#ecd39f',
            fontFamily: 'var(--serif)',
            fontSize: { xs: '1.1rem', sm: '1.3rem' },
            fontStyle: 'italic',
            lineHeight: 1.6,
            mb: 1,
          }}
        >
          Te invito a mi noche especial...
        </Typography>
        <Typography
          variant="h2"
          component="div"
          className="script-heading"
          sx={{
            fontSize: { xs: '4rem', sm: '6rem', lg: '8rem' },
            fontWeight: 400,
            color: '#ecd39f',
            lineHeight: 1,
            mb: 1,
            letterSpacing: '0.02em',
          }}
        >
          Josefina
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mt: 1, mb: 2 }}>
          <Box component="span" sx={{ width: '60px', height: '1px', background: 'linear-gradient(to right, transparent, #c9a35e, transparent)' }} />
          <Box component="span" sx={{ color: '#ecd39f', fontSize: '1rem' }}>✦</Box>
          <Box component="span" sx={{ width: '60px', height: '1px', background: 'linear-gradient(to right, transparent, #c9a35e, transparent)' }} />
        </Box>
        <Typography
          variant="body2"
          component="div"
          sx={{
            color: '#f5e1c8',
            fontFamily: 'var(--serif)',
            fontSize: { xs: '1.1rem', sm: '1.25rem' },
            mb: 0.5,
          }}
        >
          {EVENT.eventDateLabel}
        </Typography>
        <Typography
          variant="caption"
          component="div"
          sx={{
            color: '#c9a35e',
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            fontSize: '0.8rem',
            mb: 3,
          }}
        >
          21:30 HRS
        </Typography>
        <Typography
          variant="body2"
          component="div"
          sx={{
            color: '#f5e1c8',
            fontFamily: 'var(--serif)',
            fontStyle: 'italic',
            fontSize: { xs: '0.9rem', sm: '1rem' },
            lineHeight: 1.6,
            mb: 3,
            maxWidth: 400,
            mx: 'auto',
          }}
        >
          «Mi noche soñada está llegando, y quiero que seas parte...»
        </Typography>
        <Button
          sx={{
            border: '1px solid #c9a35e',
            bgcolor: 'transparent',
            color: '#c9a35e',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            fontSize: { xs: '0.8rem', sm: '0.9rem' },
            py: 1,
            px: 3,
            borderRadius: '999px',
            '&:hover': { bgcolor: '#c9a35e', color: '#050505' },
          }}
          onClick={() => onScrollTo('itinerary')}
        >
          SIGUE AQUÍ...
        </Button>
      </Box>
    </Box>
  );
}
