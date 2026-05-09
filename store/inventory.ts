import { EntityCrop } from '@/types/entity';
import { v4 } from 'uuid';
import { create } from 'zustand';

export const MAX_STACK = 9;

interface InventoryItem {
  id: string;
}

export type InventoryCrop = InventoryItem &
  Pick<EntityCrop, 'type' | 'name'> & {
    quantity: number;
  };

type InventorySlot = InventoryCrop;

interface StorageStore {
  items: InventorySlot[];
  addItem: (item: InventorySlot) => void;
}

export const useInventory = create<StorageStore>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const newItems = [...state.items];

      let quantity = item.quantity;

      while (quantity > 0) {
        const exist = newItems.find((i) => i.type === item.type && i.quantity < MAX_STACK);
        const amount = Math.min(quantity, Math.max(MAX_STACK - (exist?.quantity || 0), 0));

        if (!exist)
          newItems.push({
            ...item,
            id: v4(),
            quantity: amount,
          });
        else exist.quantity += amount;

        quantity -= amount;
      }

      return { items: newItems };
    }),
}));
