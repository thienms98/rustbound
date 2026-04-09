import { create } from 'zustand';

interface Inventory {
  stone: number;
  addStone: () => void;
  wood: number;
  addWood: () => void;
}

export const useInventory = create<Inventory>((set) => ({
  stone: 0,
  wood: 0,
  addStone: () => {
    set((state) => ({ stone: state.stone + 1 }));
  },
  addWood: () => {
    set((state) => ({ wood: state.wood + 1 }));
  },
}));
