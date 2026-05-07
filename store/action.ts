import { Vector3 } from 'three';
import { create } from 'zustand';

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
  action: BaseAction;
  setAction: (action: BaseAction) => void;
}

export const useAction = create<ActionStore>((set) => ({
  action: {
    type: ActionType.NONE,
  },
  setAction: (action) => set({ action }),
}));
