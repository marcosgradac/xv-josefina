import { useEffect, useImperativeHandle, useRef, useState, type Ref } from 'react';
import { createPortal } from 'react-dom';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import PauseRounded from '@mui/icons-material/PauseRounded';

export type MusicPlayerHandle = { play: () => void };

const volume = 0.3;
const fadeDuration = 1300;

export default function MusicPlayer({ ref, menuItem }: {
  ref: Ref<MusicPlayerHandle>;
  menuItem: HTMLLIElement | null;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeFrame = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  function play() {
    const audio = audioRef.current;
    if (!audio || !audio.paused) return;

    cancelAnimationFrame(fadeFrame.current);
    audio.volume = 0;
    // Keep this call synchronous with the button press for mobile playback policies.
    void audio.play().then(() => {
      if (audio.paused || audioRef.current !== audio) return;
      const startedAt = performance.now();
      const fade = (now: number) => {
        if (audio.paused || audioRef.current !== audio) return;
        const progress = Math.min(1, (now - startedAt) / fadeDuration);
        audio.volume = volume * progress;
        if (progress < 1) fadeFrame.current = requestAnimationFrame(fade);
      };
      fadeFrame.current = requestAnimationFrame(fade);
    }).catch(() => {
      if (audioRef.current === audio) setPlaying(false);
    });
  }

  useImperativeHandle(ref, () => ({ play }));

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      cancelAnimationFrame(fadeFrame.current);
      audio?.pause();
    };
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      if (audio.error) audio.load();
      setUnavailable(false);
      play();
    } else {
      audio.pause();
    }
  }

  const label = playing ? 'Pausar música' : unavailable ? 'Reintentar reproducir música' : 'Reproducir música';

  return (
    <>
      <audio
        ref={audioRef}
        src={import.meta.env.BASE_URL + 'audio/josefina-love.mp3'}
        preload="none"
        loop
        onPlaying={() => { setPlaying(true); setUnavailable(false); }}
        onPause={() => { cancelAnimationFrame(fadeFrame.current); setPlaying(false); }}
        onError={() => { cancelAnimationFrame(fadeFrame.current); setPlaying(false); setUnavailable(true); }}
      />
      {menuItem && createPortal(
        <button type="button" className="section-menu-music" onClick={toggle}>
          {playing ? <PauseRounded fontSize="small" /> : <PlayArrowRounded fontSize="small" />}
          {label}
        </button>,
        menuItem,
      )}
    </>
  );
}
