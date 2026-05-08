import { Entity } from '@/types/entity';
import { create } from 'zustand';

export enum EntityType {
  SOIL = 'soil',
  CROP = 'crop',
}
interface EntityStore {
  entities: Entity[];
  addEntity: (item: Entity) => void;
  removeEntities: (ids: string[]) => void;
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
  removeEntities: (ids: string[]) =>
    set((state) => {
      return {
        entities: state.entities.filter((ent) => !ids.includes(ent.id)),
      };
    }),
}));
