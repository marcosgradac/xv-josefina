import { createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';

// Colores de la invitación
export const COLORS = {
  background: '#0b0b14',
  surface: '#131320',
  gold: '#D4AF37',
  goldLight: '#e0bf90',
  textLight: '#f5e1c8',
  subtitleLight: '#f6efe8',
  textDim: 'rgba(245, 225, 200, 0.5)',
  white: '#ffffff',
  black: '#000000',
};

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    background: {
      default: COLORS.background,
      paper: COLORS.surface,
    },
    primary: {
      main: COLORS.gold,
      light: COLORS.goldLight,
    },
    text: {
      primary: COLORS.textLight,
      secondary: COLORS.subtitleLight,
    },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      color: COLORS.white,
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      color: COLORS.white,
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      color: COLORS.white,
    },
    body1: {
      fontFamily: '"Inter", sans-serif',
      color: COLORS.textLight,
    },
    body2: {
      fontFamily: '"Inter", sans-serif',
      color: COLORS.subtitleLight,
    },
    caption: {
      fontFamily: '"Montserrat", sans-serif',
      textTransform: 'uppercase',
      letterSpacing: '0.4em',
      fontSize: '0.75rem',
      color: COLORS.gold,
      opacity: 0.5,
    },
  },
  shape: {
    borderRadius: 12,
  },
};

export const muiTheme = createTheme(themeOptions);