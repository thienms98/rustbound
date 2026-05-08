import { Tile } from '@/components/objects/Grid';
import { Vector2, Vector3 } from 'three';
import { create } from 'zustand';

export enum EntityType {
  SOIL = 'soil',
  CROP = 'crop',
}

export interface BaseEntity {
  id: string;
  name: string;
  position: Vector3;
  footprint: Vector3;
}

export interface EntityCrop extends BaseEntity {
  type: EntityType.CROP;
  userData: {
    plantedAt: number;
    growthDuration: number;
  };
}

export interface EntitySoil extends BaseEntity {
  type: EntityType.SOIL;
}

export type Entity = EntityCrop | EntitySoil;

interface EntityStore {
  entities: Entity[];
  addEntity: (item: Entity) => void;
  destroyEntitiesInTile: (pos: Vector3) => void;
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
  destroyEntitiesInTile: (pos: Vector3) =>
    set((state) => {
      const x = Math.floor(pos.x);
      const z = Math.floor(pos.z);

      return {
        entities: state.entities.filter((ent) => ent.position.x !== x || ent.position.z !== z),
      };
    }),
}));
