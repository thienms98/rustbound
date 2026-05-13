import { Vector3 } from 'three';
import { create } from 'zustand';
import { InventorySlot } from './inventory';

export enum ActionType {
  NONE = 'none',
  PLANT = 'plant',
  BUILD = 'build',
  DESTROY = 'destroy',
}

interface BaseAction {
  type: ActionType;
  item?: {
    type: 'crop' | 'tree';
    footprint: Vector3;
  };
}

interface ActionStore {
  hand: InventorySlot | null;
  setHand: (item: InventorySlot | null) => void;
  action: BaseAction;
  setAction: (action: BaseAction) => void;
}

export const useAction = create<ActionStore>((set) => ({
  hand: null,
  action: {
    type: ActionType.NONE,
  },
  setHand: (item) => set({ hand: item }),
  setAction: (action) => set({ action }),
}));
