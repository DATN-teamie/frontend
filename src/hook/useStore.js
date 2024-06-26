import { create } from 'zustand';

export const useStore = create((set) => ({
  currentWorkspace: null,
  updateWorkspace: (newWorkspace) => set({ currentWorkspace: newWorkspace }),

  authUser: null,
  updateAuthUser: (newUser) => set({ authUser: newUser }),

  currentBoard: null,
  updateBoard: (newBoard) => set({ currentBoard: newBoard }),

  currentItem: null,
  updateItem: (newItem) => set({ currentItem: newItem }),

  containers: [],
  updateContainers: (newContainers) => set({ containers: newContainers }),
  addContainer: (newContainer) =>
    set((state) => ({ containers: [...state.containers, newContainer] })),
  
}));
