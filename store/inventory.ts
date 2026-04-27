import { addItemToInventory, InventoryItem, MAX_SLOT, splitSlot, swapInventoryItem } from '@/lib/inventory';
import { ResourceType } from '@/lib/resource';
import { v4 } from 'uuid';
import { create } from 'zustand';

interface Inventory {
  items: InventoryItem[];
  addItem: (type: ResourceType, quantity: number) => void;
  swapItem: (source: number, target: number) => void;
  splitItem: (index: number) => void;
}

export const useInventory = create<Inventory>((set) => ({
  items: Array.from({ length: MAX_SLOT }).map((_, i) => ({
    id: i < 4 ? v4() : undefined,
    type: i < 2 ? ResourceType.ROCK : i < 4 ? ResourceType.TREE : undefined,
    quantity: i < 4 ? 2 : 0,
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
  splitItem(index) {
    set((state) => ({
      items: splitSlot([...state.items], index),
    }));
  },
}));
