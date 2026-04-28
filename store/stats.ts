import { create } from "zustand";

interface Stats {
  stats: {
    balance: number;
  };
  changeBalance: (amount: number) => void;
}

export const useStats = create<Stats>((set) => ({
  stats: {
    balance: 20000000
  },
  changeBalance: (amount: number) =>
    set((state) => ({
      stats: { ...state.stats, balance: state.stats.balance + amount }
    }))
}));
