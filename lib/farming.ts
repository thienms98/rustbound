import { CharacterStats } from "@/types/character";
import { RapierRigidBody } from "@react-three/rapier";
import { Object3D, Raycaster, Vector3 } from "three";

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
  plantedAt?: Date;
  stage: GROWING_STAGE;
}

export interface Plant {
  id: string;
  type: string;
  name: string;
  category: string;
  growthTime: number;
}

export const raycastPlots = (payload: {
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

  if (closest.distance < 10) return closest;
  else return null;
};
