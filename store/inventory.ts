import { addItemToInventory, InventorySlot, MAX_SLOT, splitSlot, swapInventoryItem } from '@/lib/inventory';
import { ResourceType } from '@/lib/resource';
import { v4 } from 'uuid';
import { create } from 'zustand';

interface Inventory {
  items: InventorySlot[];
  addItem: (type: ResourceType, quantity: number) => void;
  swapItem: (source: number, target: number) => void;
  splitItem: (index: number) => void;
}

export const useInventory = create<Inventory>((set) => ({
  items: Array.from({ length: MAX_SLOT }).map((_, i) =>
    i < 4
      ? {
          id: v4(),
          type: i < 2 ? ResourceType.ROCK : ResourceType.TREE,
          quantity: 2,
        }
      : null,
  ),
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
