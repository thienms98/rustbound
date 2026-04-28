import {
  addItemToInventory,
  InventorySlot,
  MAX_SLOT,
  splitSlot,
  swapInventoryItem
} from "@/lib/inventory";
import { GeneralType } from "@/lib/resource";
import { v4 } from "uuid";
import { create } from "zustand";

interface Inventory {
  items: InventorySlot[];
  addItem: (type: GeneralType, quantity: number) => void;
  swapItem: (source: number, target: number) => void;
  splitItem: (index: number) => void;
}

export const useInventory = create<Inventory>((set) => ({
  items: Array.from({ length: MAX_SLOT }).map(() => null),
  addItem(type, quantity) {
    set((state) => ({
      items: addItemToInventory({ items: [...state.items], quantity, type })
    }));
  },
  swapItem(source, target) {
    set((state) => ({
      items: swapInventoryItem({ items: [...state.items], source, target })
    }));
  },
  splitItem(index) {
    set((state) => ({
      items: splitSlot([...state.items], index)
    }));
  }
}));
