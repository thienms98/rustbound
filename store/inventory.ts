import { addItemToInventory, InventoryItem } from "@/lib/inventory";
import { ResourceType } from "@/lib/resource";
import { create } from "zustand";

interface Inventory {
  items: InventoryItem[];
  addItem: (type: ResourceType, quantity: number) => void;
}

export const useInventory = create<Inventory>((set) => ({
  items: [],
  addItem(type, quantity) {
    set((state) => ({
      items: addItemToInventory({ items: [...state.items], quantity, type })
    }));
  }
}));
