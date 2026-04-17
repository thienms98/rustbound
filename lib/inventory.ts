import { ResourceType } from "./resource";
import { v4 } from "uuid";

export type InventoryRule = Record<
  ResourceType,
  {
    maxStacks: number;
  }
>;

export interface InventoryItem {
  id: string;
  type: ResourceType;
  quantity: number;
  order: number;
}

export const MAX_SLOT = 8;

export const resourceInventoryRules: InventoryRule = {
  [ResourceType.TREE]: {
    maxStacks: 5
  },
  [ResourceType.ROCK]: {
    maxStacks: 2
  }
};

interface InventoryAddPayload {
  items: InventoryItem[];
  type: ResourceType;
  quantity: number;
}

export const addItemToInventory = ({
  items,
  type,
  quantity
}: InventoryAddPayload): InventoryItem[] => {
  const newItems = [...items];
  const { maxStacks } = resourceInventoryRules[type];

  while (quantity > 0) {
    const item = newItems.find(
      (i) => i.type === type && i.quantity < maxStacks
    );

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

export const addNewItemSlot = ({
  items,
  quantity,
  type
}: InventoryAddPayload) => {
  if (items.length === MAX_SLOT) return;

  for (let order = 0; order < MAX_SLOT; order++) {
    const exists = Boolean(items.find((i) => i.order));
    if (!exists) {
      items.push({
        id: v4(),
        type,
        quantity,
        order
      });
      return;
    }
  }
};

export const swapInventoryItem = ({
  items,
  source,
  target
}: {
  items: InventoryItem[];
  source: InventoryItem;
  target: InventoryItem;
}) => {
  if (source.type === target.type) {
    const { maxStacks } = resourceInventoryRules[target.type];
    const newTargetQty = Math.min(maxStacks, target.quantity + source.quantity);
    const newSourceQty = source.quantity - (newTargetQty - target.quantity);

    return [...items].map((item) => ({
      ...item,
      quantity:
        item.id === target.id
          ? newTargetQty
          : item.id === source.id
            ? newSourceQty
            : item.quantity
    }));
  }

  return [...items].map((item) => ({
    ...item,
    order:
      item.id === target.id
        ? target.order
        : item.id === source.id
          ? source.order
          : item.order
  }));
};

export const ASSET_MAP = {
  [ResourceType.ROCK]: { x: 7, y: 9 },
  [ResourceType.TREE]: { x: 8, y: 5 }
};
export const ASSET_SIZE = 16;

export const getResourceAssetPosition = (type: ResourceType) => {
  const { x, y } = ASSET_MAP[type];

  return {
    x: x * ASSET_SIZE,
    y: y * ASSET_SIZE
  };
};
