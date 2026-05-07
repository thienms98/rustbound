import { Vector3 } from 'three';
import { create } from 'zustand';

export enum EntityType {
  SOIL = 'soil',
  CROP = 'crop',
}

interface Entity {
  id: string;
  name: string;
  type: EntityType;
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
      const isTypeInTile = state.entities.find((ent) => ent.position.equals(item.position) && item.type === ent.type);
      if (isTypeInTile) return { entities: state.entities };

      return {
        entities: [...state.entities, item],
      };
    }),
}));
