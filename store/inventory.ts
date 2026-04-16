import {
  addItemToInventory,
  InventoryItem,
  swapInventoryItem
} from "@/lib/inventory";
import { ResourceType } from "@/lib/resource";
import { create } from "zustand";

interface Inventory {
  items: InventoryItem[];
  addItem: (type: ResourceType, quantity: number) => void;
  swapItem: (source: InventoryItem, target: InventoryItem) => void;
}

export const useInventory = create<Inventory>((set) => ({
  items: [],
  addItem(type, quantity) {
    set((state) => ({
      items: addItemToInventory({ items: [...state.items], quantity, type })
    }));
  },
  swapItem(source, target) {
    set((state) => ({
      items: swapInventoryItem({ items: [...state.items], source, target })
    }));
  }
}));
