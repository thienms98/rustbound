import InventoryItem from "@/components/Panel/Inventory/InventoryItem";
import {
  GeneralType,
  ResourceType,
  SeedType,
  TreeType,
  UtilityType
} from "./resource";
import { v4 } from "uuid";

export type InventoryRule = {
  [key in GeneralType]?: {
    maxStacks: number;
  };
};

export interface InventoryItem {
  id: string;
  type: GeneralType;
  quantity: number;
}

export type InventorySlot = InventoryItem | null;

export const MAX_SLOT = 20; // 5 cols * 4 rows

export const resourceInventoryRules: InventoryRule = {
  [ResourceType.TREE]: {
    maxStacks: 5
  },
  [ResourceType.ROCK]: {
    maxStacks: 2
  },
  [SeedType.CARROT_SEED]: { maxStacks: 20 },
  [SeedType.WHEET_SEED]: { maxStacks: 20 },
  [TreeType.APPLE_TREE]: { maxStacks: 1 },
  [UtilityType.FERTILIZER]: { maxStacks: 10 }
};

interface InventoryAddPayload {
  items: InventorySlot[];
  type: GeneralType;
  quantity: number;
}

export enum InventoryErrors {
  FULL_SLOTS = "Full of slots",
  EMPTY_SLOT = "Current slot is empty"
}

export const addItemToInventory = ({
  items,
  type,
  quantity
}: InventoryAddPayload): InventorySlot[] => {
  const newItems = [...items];
  const maxStacks = resourceInventoryRules[type]?.maxStacks || 1;

  try {
    while (quantity > 0) {
      const item = newItems.find(
        (i) => i && i.type === type && i.quantity < maxStacks
      );

      const maxAbleToAdd = item ? maxStacks - item.quantity : maxStacks;
      const toAdd = Math.min(quantity, maxAbleToAdd);
      quantity -= toAdd;

      if (item) addToExistsSlot(item, toAdd);
      else addNewItemSlot({ items: newItems, type, quantity: toAdd });
    }
  } catch (err) {
    console.error(err);
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
  for (let order = 0; order < MAX_SLOT; order++) {
    const idx = items.findIndex((i) => !i);
    if (idx === -1) throw new Error(InventoryErrors.FULL_SLOTS);

    items[idx] = {
      id: v4(),
      type,
      quantity
    };
    return items;
  }
};

export const swapInventoryItem = ({
  items,
  source,
  target
}: {
  items: InventorySlot[];
  source: number;
  target: number;
}) => {
  const newItems = [...items];
  const sourceItem = newItems[source];
  const targetItem = newItems[target];

  if (!sourceItem) return;

  if (targetItem && sourceItem.type === targetItem.type) {
    const maxStacks = resourceInventoryRules[targetItem.type]?.maxStacks || 1;
    const newTargetQty = Math.min(
      maxStacks,
      targetItem.quantity + sourceItem.quantity
    );
    const newSourceQty =
      sourceItem.quantity - (newTargetQty - targetItem.quantity);

    newItems[target]!.quantity = newTargetQty;
    if (!newSourceQty) newItems[source] = null;
    else newItems[source]!.quantity = newSourceQty;

    return newItems;
  }

  newItems[target] = items[source] ? { ...items[source] } : items[source];
  newItems[source] = items[target] ? { ...items[target] } : items[target];
  return newItems;
};

export const ASSET_MAP: { [key in GeneralType]: { x: number; y: number } } = {
  [ResourceType.ROCK]: { x: 7, y: 9 },
  [ResourceType.TREE]: { x: 8, y: 5 },
  [SeedType.CARROT_SEED]: { x: 8, y: 11 },
  [SeedType.WHEET_SEED]: { x: 8, y: 10 },
  [TreeType.APPLE_TREE]: { x: 8, y: 9 },
  [UtilityType.FERTILIZER]: { x: 8, y: 8 }
};
export const ASSET_SIZE = 16;

export const getResourceAssetPosition = (type: GeneralType) => {
  const position = ASSET_MAP[type];
  if (!position) return null;

  return {
    x: position.x * ASSET_SIZE,
    y: position.y * ASSET_SIZE
  };
};

export const splitSlot = (items: InventorySlot[], slot: number) => {
  console.log("🚀 ~ splitSlot ~ items:", items);
  try {
    const currentSlot = items[slot];
    if (!currentSlot || !currentSlot.type || currentSlot.quantity <= 1)
      throw new Error(InventoryErrors.EMPTY_SLOT);

    const emptySlotIdx = items.findIndex((i) => !i);
    console.log(emptySlotIdx);
    if (emptySlotIdx === -1) throw new Error(InventoryErrors.FULL_SLOTS);

    const splitQty = Math.round(currentSlot.quantity / 2);
    Object.assign(currentSlot, {
      quantity: currentSlot.quantity - splitQty
    });
    items[emptySlotIdx] = { ...currentSlot, id: v4(), quantity: splitQty };
  } catch (err) {
    console.error(err);
  }

  return items;
};
