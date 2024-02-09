import { create } from 'zustand';

export const useStore = create(set => ({
  isDirty: false,
  setIsDirty: (value) => set({ isDirty: value }),
}));