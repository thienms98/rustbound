import { Vector3 } from "three";
import { create } from "zustand";

interface Entity {
  id: string;
  name: string;
  type: string;
  position: Vector3;
  footprint: Vector3;
}

interface EntityStore {
  entities: Entity[];
  addEntity: (item: Entity) => void;
}

export const useEntity = create<EntityStore>((set) => ({
  entities: [],
  addEntity: (item: Entity) =>
    set((state) => {
      const isTypeInTile = state.entities.find((ent) =>
        ent.position.equals(item.position)
      );
      console.log("🚀 ~ isTypeInTile:", isTypeInTile);

      return {
        entities: [...state.entities, item]
      };
    })
}));
