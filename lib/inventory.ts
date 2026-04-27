import InventoryItem from '@/components/Panel/Inventory/InventoryItem';
import { ResourceType } from './resource';
import { v4 } from 'uuid';

export type InventoryRule = Record<
  ResourceType,
  {
    maxStacks: number;
  }
>;

export interface EmptySlot {
  id: undefined;
  type: undefined;
  quantity: number;
}

export interface InventorySlot {
  id: string;
  type: ResourceType;
  quantity: number;
}

export type InventoryItem = InventorySlot | EmptySlot;

export const MAX_SLOT = 20; // 5 cols * 4 rows

export const resourceInventoryRules: InventoryRule = {
  [ResourceType.TREE]: {
    maxStacks: 5,
  },
  [ResourceType.ROCK]: {
    maxStacks: 2,
  },
};

interface InventoryAddPayload {
  items: InventoryItem[];
  type: ResourceType;
  quantity: number;
}

export enum InventoryErrors {
  FULL_SLOTS = 'Full of slots',
  EMPTY_SLOT = 'Current slot is empty',
}

export const addItemToInventory = ({ items, type, quantity }: InventoryAddPayload): InventoryItem[] => {
  const newItems = [...items];
  const { maxStacks } = resourceInventoryRules[type];

  try {
    while (quantity > 0) {
      const item = newItems.find((i) => i.type === type && i.quantity < maxStacks);

      const maxAbleToAdd = item ? maxStacks - item.quantity : maxStacks;
      const toAdd = Math.min(quantity, maxAbleToAdd);
      quantity -= toAdd;

      if (item) addToExistsSlot(item, toAdd);
      else addNewItemSlot({ items: newItems, type, quantity: toAdd });
    }
  } catch (err) {
    const { message } = err as { message: InventoryErrors };
    switch (message) {
      case InventoryErrors.FULL_SLOTS:
        console.log('full mat rui');
        break;
      default:
        console.log(err);
    }
  }

  return newItems;
};

export const addToExistsSlot = (item: InventoryItem, quantity: number) => {
  item.quantity += quantity;
};

export const addNewItemSlot = ({ items, quantity, type }: InventoryAddPayload) => {
  for (let order = 0; order < MAX_SLOT; order++) {
    const idx = items.findIndex((i) => !i.type);
    if (idx === -1) throw new Error(InventoryErrors.FULL_SLOTS);

    items[idx] = {
      id: v4(),
      type,
      quantity,
    };
    return items;
  }
};

export const swapInventoryItem = ({ items, source, target }: { items: InventoryItem[]; source: number; target: number }) => {
  const newItems = [...items];
  const sourceItem = newItems[source];
  const targetItem = newItems[target];

  if (!sourceItem.id) return;

  if (sourceItem.type === targetItem.type && targetItem.type) {
    const { maxStacks } = resourceInventoryRules[targetItem.type];
    const newTargetQty = Math.min(maxStacks, targetItem.quantity + sourceItem.quantity);
    const newSourceQty = sourceItem.quantity - (newTargetQty - targetItem.quantity);

    newItems[target].quantity = newTargetQty;
    if (!newSourceQty)
      newItems[source] = {
        id: undefined,
        type: undefined,
        quantity: 0,
      };
    else newItems[source].quantity = newSourceQty;

    return newItems;
  }

  newItems[target] = { ...items[source] };
  newItems[source] = { ...items[target] };
  return newItems;
};

export const ASSET_MAP = {
  [ResourceType.ROCK]: { x: 7, y: 9 },
  [ResourceType.TREE]: { x: 8, y: 5 },
};
export const ASSET_SIZE = 16;

export const getResourceAssetPosition = (type: ResourceType) => {
  const { x, y } = ASSET_MAP[type];

  return {
    x: x * ASSET_SIZE,
    y: y * ASSET_SIZE,
  };
};

export const splitSlot = (items: InventoryItem[], slot: number) => {
  try {
    const currentSlot = items[slot];
    if (!currentSlot || !currentSlot.type || currentSlot.quantity <= 1) throw new Error(InventoryErrors.EMPTY_SLOT);

    const emptySlotIdx = items.findIndex((i) => !i.type);
    if (emptySlotIdx === -1) throw new Error(InventoryErrors.FULL_SLOTS);

    const splitQty = Math.round(currentSlot.quantity / 2);
    Object.assign(currentSlot, {
      quantity: currentSlot.quantity - splitQty,
    });
    items[emptySlotIdx] = { ...currentSlot, id: v4(), quantity: splitQty };
  } catch (err) {
    console.error(err);
  }

  return items;
};
