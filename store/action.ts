import { Vector3 } from "three";
import { create } from "zustand";

export enum ActionType {
  NONE = "none",
  TILL = "till",
  PLANT = "plant",
  WATER = "water",
  HAVERST = "haverst",
  BUILD = "build",
  DESTROY = "destroy"
}

interface BaseAction {
  type: ActionType;
  item?: {
    type: "crop" | "tree";
    footprint: Vector3;
  };
}

interface ActionStore {
  action: BaseAction;
  setAction: (action: BaseAction) => void;
}

export const useAction = create<ActionStore>((set) => ({
  action: {
    type: ActionType.NONE
  },
  setAction: (action) => set({ action })
}));
