import InventoryItem from '@/components/InventoryItem';
import { ResourceType } from './resource';
import { v4 } from 'uuid';

export type InventoryRule = Record<
  ResourceType,
  {
    maxStacks: number;
  }
>;

export interface InventoryItem {
  id?: string;
  type?: ResourceType;
  quantity: number;
}

export const MAX_SLOT = 8;

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

export const addItemToInventory = ({ items, type, quantity }: InventoryAddPayload): InventoryItem[] => {
  const newItems = [...items];
  const { maxStacks } = resourceInventoryRules[type];

  while (quantity > 0) {
    const item = newItems.find((i) => i.type === type && i.quantity < maxStacks);

    const maxAbleToAdd = item ? maxStacks - item.quantity : maxStacks;
    const toAdd = Math.min(quantity, maxAbleToAdd);
    quantity -= toAdd;

    if (item) addToExistsSlot(item, toAdd);
    else addNewItemSlot({ items: newItems, type, quantity: toAdd });
  }

  return newItems;
};

export const addToExistsSlot = (item: InventoryItem, quantity: number) => {
  item.quantity += quantity;
};

export const addNewItemSlot = ({ items, quantity, type }: InventoryAddPayload) => {
  for (let order = 0; order < MAX_SLOT; order++) {
    const idx = items.findIndex((i) => !i.type);
    if (idx === -1) return items;

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
    newItems[source].quantity = newSourceQty;

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
