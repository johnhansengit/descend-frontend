import { create } from 'zustand';
import themes from '../../themes';

export const useStore = create(set => ({
  isDirty: false,
  user: null,
  setIsDirty: (value) => set({ isDirty: value }),
  setUser: (user) => set({ user }),
}));

export const useThemeStore = create(set => ({
  theme: themes['blue-hole'], // default theme
  setTheme: (themeName) => set({ theme: themes[themeName.toLowerCase().replace(' ', '-')] }),
}));