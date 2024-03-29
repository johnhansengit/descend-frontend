import { createTheme } from '@mui/material/styles';

const themes = {
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
      greyed: '#e7e7e8',
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
      accent: { main: '#C6C951' },
      text: { primary: '#ffffff' },
      foreground: '#7698c1',
      greyed: '#535353',
    },
  }),
  'reef-crest': createTheme({
    typography: {
      fontFamily: 'Lato, Arial, sans-serif',
    },
    palette: {
      primary: { main: '#168cca' },
      secondary: { main: '#58d1f7' },
      warning: { main: '#fead26' },
      accent: { main: '#ffeb46' },
      text: { primary: '#168cca' },
      foreground: '#fbfbfb',
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

export default themes;