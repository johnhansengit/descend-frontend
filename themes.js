import { createTheme } from '@mui/material/styles';

export const themes = {
  'blue-hole': createTheme({
    typography: {
      fontFamily: 'Lato, Arial, sans-serif',
    },
    palette: {
      primary: { main: '#01225e' },
      secondary: { main: '#12dafb' },
      warning: { main: '#fb8500' },
      accent: { main: '#ffcc00' },
      text: { primary: '#01225e' },
      foreground: '#ffffff',
      greyed: '#f7f7f8',
    },
  }),
  'night-dive': createTheme({
    typography: {
      fontFamily: 'Lato, Arial, sans-serif',
    },
    palette: {
      primary: { main: '#0b1623' },
      secondary: { main: '#77c5d1' },
      warning: { main: '#f86700' },
      accent: { main: '#ebfb72' },
      text: { primary: '#0b1623' },
      foreground: '#7698c1',
      greyed: '#535353',
    },
  }),
  'reefcrest': createTheme({
    typography: {
      fontFamily: 'Lato, Arial, sans-serif',
    },
    palette: {
      primary: { main: '#f5f5f5' },
      secondary: { main: '#58d1f7' },
      warning: { main: '#fead26' },
      accent: { main: '#ffeb46' },
      text: { primary: '#f5f5f5' },
      foreground: '#168cca',
      greyed: '#c3e5fa',
    },
  }),
  'kelp-forest': createTheme({
    typography: {
      fontFamily: 'Lato, Arial, sans-serif',
    },
    palette: {
      primary: { main: '#0b4e32' },
      secondary: { main: '#0fbe98' },
      warning: { main: '#e6710d' },
      accent: { main: '#eddf67' },
      text: { primary: '#0b4e32' },
      foreground: '#ffffff',
      greyed: '#aeaeae',
    },
  }),
};