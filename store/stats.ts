import { create } from 'zustand';

interface Stats {
  stats: {
    balance: number;
  };
}

export const useStats = create<Stats>((set) => ({
  stats: {
    balance: 2000,
  },
}));
