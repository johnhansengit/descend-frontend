import { create } from 'zustand';
import themes from '../../themes';
import Client from '../services/api';

export const useStore = create(set => ({
  user: null,
  setUser: (user) => set({ user }),

  isDirty: false,
  setIsDirty: (value) => set({ isDirty: value }),
  
  updateCount: 0,
  setUpdateCount: (value) => set({ updateCount: value }),

  diveSites: [],
  fetchDiveSites: async () => {
    const response = await Client.get('/api/diveSites');
    const diveSites = response.data;
    set({ diveSites });
  },
  addDiveSite: (newDiveSite) => set((state) => ({ diveSites: [...state.diveSites, newDiveSite] })),
}));

export const useThemeStore = create(set => ({
  theme: themes['blue-hole'], // default theme
  setTheme: (themeName) => set({ theme: themes[themeName.toLowerCase().replace(' ', '-')] }),
}));