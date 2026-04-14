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

const MAX_SLOT = 8;

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
