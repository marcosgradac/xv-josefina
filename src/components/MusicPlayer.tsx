import { useEffect, useRef, useState } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';

export default function MusicPlayer({
  enabled,
  playing,
  onToggle,
}: {
  enabled: boolean;
  playing: boolean;
  onToggle: () => void;
}) {
  const ctxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!enabled) {
      ctxRef.current?.close();
      ctxRef.current = null;
      return;
    }

    const initAudio = async () => {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      ctxRef.current = ctx;

      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(110, ctx.currentTime); // A2

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(isMuted ? 0 : 0.03, ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);

      oscRef.current = osc;
      gainRef.current = gain;

      if (playing && !isMuted) {
        osc.start();
      }
    };

    initAudio();
    return () => {
      oscRef.current?.stop();
      oscRef.current = null;
      gainRef.current = null;
      ctxRef.current?.close();
      ctxRef.current = null;
    };
  }, [enabled, playing, isMuted]);

  useEffect(() => {
    if (ctxRef.current && oscRef.current && gainRef.current) {
      if (playing && !isMuted) {
        oscRef.current.start();
        gainRef.current.gain.setValueAtTime(0.03, ctxRef.current.currentTime);
      } else {
        gainRef.current.gain.setValueAtTime(0, ctxRef.current.currentTime);
        oscRef.current.stop();
      }
    }
  }, [playing, isMuted]);

  const handleToggle = () => onToggle();

  const handleMute = () => setIsMuted((prev) => {
    const next = !prev;
    if (gainRef.current) gainRef.current.gain.setValueAtTime(next ? 0 : 0.03, (ctxRef.current as AudioContext).currentTime);
    return next;
  });

  if (!enabled) return null;

  return (
    <Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
      <Tooltip title={isMuted ? 'Activar sonido' : 'Silenciar sonido'}>
        <IconButton
          size="small"
          onClick={handleMute}
          sx={{
            bgcolor: 'rgba(255,255,255,0.1)',
            color: isMuted ? 'text.disabled' : 'primary',
            '&:hover': { bgcolor: 'rgba(212,175,55,0.2)' },
            border: '1px solid',
            borderColor: 'rgba(212,175,55,0.3)',
          }}
        >
          {isMuted ? '🔇' : '🔊'}
        </IconButton>
      </Tooltip>
      <Tooltip title={playing ? 'Pausar música' : 'Reproducir música'}>
        <IconButton
          size="small"
          onClick={handleToggle}
          sx={{
            bgcolor: 'rgba(212,175,55,0.15)',
            color: '#D4AF37',
            '&:hover': { bgcolor: 'rgba(212,175,55,0.3)' },
            border: '1px solid',
            borderColor: '#D4AF37',
          }}
        >
          {playing ? '⏸️' : '▶️'}
        </IconButton>
      </Tooltip>
    </Box>
  );
}