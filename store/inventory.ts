import { addItemToInventory, InventoryItem, MAX_SLOT, swapInventoryItem } from '@/lib/inventory';
import { ResourceType } from '@/lib/resource';
import { create } from 'zustand';

interface Inventory {
  items: InventoryItem[];
  addItem: (type: ResourceType, quantity: number) => void;
  swapItem: (source: number, target: number) => void;
}

export const useInventory = create<Inventory>((set) => ({
  items: Array.from({ length: MAX_SLOT }).map(() => ({
    quantity: 0,
  })),
  addItem(type, quantity) {
    set((state) => ({
      items: addItemToInventory({ items: [...state.items], quantity, type }),
    }));
  },
  swapItem(source, target) {
    set((state) => ({
      items: swapInventoryItem({ items: [...state.items], source, target }),
    }));
  },
}));
