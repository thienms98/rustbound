import { EntityType } from '@/store/entity';

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
