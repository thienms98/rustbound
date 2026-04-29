import { ResourceType } from "@/lib/resource";

export interface Resource {
  id: string;
  type: ResourceType;
  position: Vector3;
  hp: number;
  maxHp: number;

  alive: boolean;
  respawnAt?: number;
}

export type EntityType = "tree" | "rock" | "crop" | "building" | "machine";

export type Entity = {
  id: string;
  type: EntityType;

  position: {
    x: number;
    z: number;
  };

  size?: {
    width: number;
    height: number;
  };

  state?: Record<string, any>;
};

export type EntityMap = Record<string, Entity>;

// Spatial lookup <'x-z', 'entityId'>
export type OccupancyMap = Record<string, string>;
// ex: occupancy["10-5"] = "entity_123";
