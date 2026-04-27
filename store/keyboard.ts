import { create } from "zustand";

interface Keyboard {
  keys: Set<string>;
}

export const useKeyboard = create<Keyboard>((set) => ({
  keys: new Set()
}));
