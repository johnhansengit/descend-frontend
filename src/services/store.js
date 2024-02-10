import { create } from 'zustand';

export const useStore = create(set => ({
  isDirty: false,
  user: null,
  setIsDirty: (value) => set({ isDirty: value }),
  setUser: (user) => set({ user }),
}));