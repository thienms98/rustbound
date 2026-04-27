import { CharacterStats } from "@/types/character";
import { RapierRigidBody } from "@react-three/rapier";
import { Object3D, Raycaster, Vector3 } from "three";
import { v4 } from "uuid";

export enum GROWING_STAGE {
  SOIL = "soil",
  SEED = "seed",
  SPROUT = "sprout",
  SEEDLING = "seedling",
  GROWTH = "growth",
  HARVESTED = "harvested"
}

export interface Plot {
  id: string;
  position: Vector3;
  plant?: Plant;
  plantedAt?: number;
  stage: GROWING_STAGE;
}

export interface Plant {
  id: string;
  type: string;
  name: string;
  category: string;
  growthTime: number;
}

export const INTERACT_RANGE = 6;

export const plants: Record<string, Plant> = {
  carrot: {
    id: v4(),
    name: "carrot",
    growthTime: 30000,
    category: "crop",
    type: "crop"
  },
  potato: {
    id: v4(),
    name: "potato",
    growthTime: 60000,
    category: "crop",
    type: "crop"
  }
};

export const raycastPlots = (payload: {
  player: RapierRigidBody;
  keys: Set<string>;
  plots: Object3D | null;
  raycaster: Raycaster;
  stats: CharacterStats;
}) => {
  const closest = getClosestPlot(payload);

  return closest?.object;
};

export const getClosestPlot = (payload: {
  player: RapierRigidBody;
  plots: Object3D | null;
  raycaster: Raycaster;
  stats: CharacterStats;
}) => {
  const { player, plots, raycaster, stats } = payload;

  const { x, z } = player.translation();
  const origin = new Vector3(x, 0, z);
  const dir = new Vector3(
    Math.sin(stats.rotation),
    0,
    Math.cos(stats.rotation)
  );

  if (!plots?.children.length) return;
  raycaster.set(origin, dir);

  const intersects = raycaster.intersectObjects(plots.children);
  const closest = intersects[0];
  if (!closest) return;

  if (closest.distance < INTERACT_RANGE) return closest;
  else return null;
};

export const plantCrop = (plot: Plot, plant: Plant): Plot => {
  return {
    ...plot,
    plant,
    plantedAt: Date.now()
  };
};
