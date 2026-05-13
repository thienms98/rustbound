import { Entity, EntityCrop } from '@/types/entity';
import { v4 } from 'uuid';
import { create } from 'zustand';
import { EntityType } from './entity';
import { Vector3 } from 'three';

export const MAX_STACK = 9;

interface InventoryItem {
  id: string;
}

export type InventoryCrop = InventoryItem & {
  name: string;
  type: EntityType.CROP;
  quantity: number;
};

export type InventorySeed = InventoryItem & {
  name: string;
  type: EntityType.SEED;
  quantity: number;
  crop: Omit<EntityCrop, 'position'>;
};

export type InventoryTool = InventoryItem & {
  name: string;
  type: EntityType.TOOL;
};

export type InventorySlot = InventoryCrop | InventorySeed | InventoryTool;

export const TOOLBAR_SLOTS = 5;

interface StorageStore {
  items: InventorySlot[];
  toolbar: (InventorySlot | null)[];
  addItem: (item: InventorySlot) => void;
}

export const useInventory = create<StorageStore>((set) => ({
  items: [],
  toolbar: [
    {
      id: 'shovel',
      name: 'shovel',
      type: EntityType.TOOL,
    },
    {
      id: 'scythe',
      name: 'scythe',
      type: EntityType.TOOL,
    },
    null,
    {
      id: 'potatoe_sheet',
      name: 'potatoe sheet',
      quantity: 6,
      type: EntityType.SEED,
      crop: {
        id: v4(),
        name: 'potatoe',
        type: EntityType.CROP,
        footprint: new Vector3(1, 1, 1),
        userData: {
          plantedAt: Date.now(),
          growthDuration: 5000,
        },
      },
    },
    {
      id: 'wheat_sheet',
      name: 'wheat sheet',
      quantity: 6,
      type: EntityType.SEED,
      crop: {
        id: v4(),
        name: 'wheat',
        type: EntityType.CROP,
        footprint: new Vector3(1, 1, 1),
        userData: {
          plantedAt: Date.now(),
          growthDuration: 5000,
        },
      },
    },
  ],
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
