import { useState, useRef, useCallback, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import MusicPlayer from './MusicPlayer';
import CountdownSection from './CountdownSection';
import GallerySection from './GallerySection';
import ItinerarySection from './ItinerarySection';
import DetailsSection from './DetailsSection';
import GiftRegistrySection from './GiftRegistrySection';
import LocationSection from './LocationSection';
import HeroSection from './HeroSection';
import CoverSection from './CoverSection';
import RSVPSection from './RSVPSection';
import '../App.css';

const sections = [
  { id: 'hero', label: 'Inicio' },
  { id: 'itinerary', label: 'Programa' },
  { id: 'gallery', label: 'Galería' },
  { id: 'countdown', label: 'Cuenta regresiva' },
  { id: 'details', label: 'Detalles' },
  { id: 'gifts', label: 'Mesa de regalos' },
  { id: 'location', label: 'Ubicación' },
  { id: 'rsvp', label: 'Confirmación' },
];

export default function Invitation() {
  const [isOpen, setIsOpen] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (isOpen) {
      document.getElementById('hero')?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!activeEntry) return;

        const index = sections.findIndex((section) => section.id === activeEntry.target.id);
        if (index >= 0) setCurrentSectionIndex(index);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0.05 },
    );

    sections.forEach(({ id }) => {
      const section = sectionRefs.current[id];
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const section = sectionRefs.current[sections[currentSectionIndex]?.id];
    if (!section) return;

    section.classList.remove('section-arrival');
    void section.offsetWidth;
    section.classList.add('section-arrival');
    const timeout = window.setTimeout(() => section.classList.remove('section-arrival'), 800);
    return () => window.clearTimeout(timeout);
  }, [currentSectionIndex, isOpen]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  const scrollToSection = useCallback(
    (id: string) => {
      const el = sectionRefs.current[id];
      if (el) {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
      }
    },
    [],
  );

  const handleMusicToggle = () => {
    setMusicEnabled(!musicEnabled);
    if (!musicEnabled) {
      setMusicPlaying(true);
    } else {
      setMusicPlaying(false);
    }
  };

  const handleNavigation = (id: string) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  if (!isOpen) {
    return <CoverSection onOpen={() => setIsOpen(true)} />;
  }

  return (
    <Box
      className="invitation-shell"
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background',
        color: 'text.primary',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      <MusicPlayer
        enabled={musicEnabled}
        playing={musicPlaying}
        onToggle={handleMusicToggle}
      />

      <Box component="nav" className="section-menu" aria-label="Navegación de la invitación">
        <IconButton
          className="section-menu-toggle"
          aria-label={menuOpen ? 'Cerrar menú de secciones' : 'Abrir menú de secciones'}
          aria-expanded={menuOpen}
          aria-controls="section-navigation-list"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true">☰</span>
        </IconButton>
        {menuOpen && (
          <Box component="ul" id="section-navigation-list" className="section-menu-list">
            {sections.map((section) => (
              <li key={section.id}>
                <button type="button" onClick={() => handleNavigation(section.id)}>
                  {section.label}
                </button>
              </li>
            ))}
          </Box>
        )}
      </Box>

      <Box
        className="invitation-content"
        sx={{ width: '100%', px: 0, py: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
      >
        <HeroSection
          ref={(el) => { sectionRefs.current.hero = el; }}
          onScrollTo={(id) => scrollToSection(id)}
        />
        <ItinerarySection
          ref={(el) => { sectionRefs.current.itinerary = el; }}
        />
        <GallerySection
          ref={(el) => { sectionRefs.current.gallery = el; }}
          onScrollTo={(id) => scrollToSection(id)}
        />
        <CountdownSection
          ref={(el) => { sectionRefs.current.countdown = el; }}
          onScrollTo={(id) => scrollToSection(id)}
        />
        <DetailsSection
          ref={(el) => { sectionRefs.current.details = el; }}
          onScrollTo={(id) => scrollToSection(id)}
        />
        <GiftRegistrySection
          ref={(el) => { sectionRefs.current.gifts = el; }}
          onScrollTo={(id) => scrollToSection(id)}
        />
        <LocationSection
          ref={(el) => { sectionRefs.current.location = el; }}
          onScrollTo={(id) => scrollToSection(id)}
        />
        <RSVPSection ref={(el) => { sectionRefs.current.rsvp = el; }} />
      </Box>
    </Box>
  );
}
