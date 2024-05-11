import { create } from 'zustand';

export const useStore = create((set) => ({
  currentWorkspace: null,
  updateWorkspace: (newWorkspace) => set({ currentWorkspace: newWorkspace }),

  authUser: null,
  updateAuthUser: (newUser) => set({ authUser: newUser }),
}));
