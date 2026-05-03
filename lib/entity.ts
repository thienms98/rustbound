import { Entity, EntityMap } from "@/types/entity";
import { Tile } from "@/types/tile";

export function spawnEntities(grid: Tile[][]): Entity[] {
  const entities: Entity[] = [];

  for (let x = 0; x < grid.length; x++) {
    for (let z = 0; z < grid[0].length; z++) {
      const tile = grid[x][z];

      if (tile.type === "grass" && Math.random() < 0.1) {
        entities.push({
          id: crypto.randomUUID(),
          type: "tree",
          position: { x, z }
        });
      }

      if (tile.type === "soil" && Math.random() < 0.05) {
        entities.push({
          id: crypto.randomUUID(),
          type: "rock",
          position: { x, z }
        });
      }
    }
  }

  return entities;
}

export const INITIAL_ENTITIES: EntityMap = {
  // --- BUILDINGS (Khu vực trung tâm) ---
  house_1: {
    id: "house_1",
    type: "building",
    position: { x: 22, z: 21 },
    size: { width: 3, height: 3 },
    state: { name: "Main Farmhouse", level: 1 }
  },
  barn_1: {
    id: "barn_1",
    type: "building",
    position: { x: 28, z: 21 },
    size: { width: 4, height: 3 },
    state: { name: "Small Barn" }
  },

  // --- MACHINES (Gần nhà) ---
  well_1: {
    id: "well_1",
    type: "machine",
    position: { x: 25, z: 19 },
    state: { water_level: 100 }
  },
  chest_1: {
    id: "chest_1",
    type: "machine",
    position: { x: 21, z: 21 },
    state: { inventory: [] }
  },

  // --- TREES (Khu rừng phía Bắc & xung quanh hồ) ---
  tree_1: { id: "tree_1", type: "tree", position: { x: 5, z: 5 } },
  tree_2: { id: "tree_2", type: "tree", position: { x: 10, z: 2 } },
  tree_3: { id: "tree_3", type: "tree", position: { x: 45, z: 4 } },
  tree_4: { id: "tree_4", type: "tree", position: { x: 35, z: 8 } },
  tree_5: { id: "tree_5", type: "tree", position: { x: 2, z: 45 } },

  // --- ROCKS (Khu vực mỏ đá phía Tây Nam) ---
  rock_1: { id: "rock_1", type: "rock", position: { x: 5, z: 40 } },
  rock_2: { id: "rock_2", type: "rock", position: { x: 8, z: 42 } },
  rock_3: { id: "rock_3", type: "rock", position: { x: 4, z: 38 } },
  rock_4: { id: "rock_4", type: "rock", position: { x: 45, z: 45 } },

  // --- CROPS (Trồng sẵn một ít trên các ô 'f') ---
  crop_1: {
    id: "crop_1",
    type: "crop",
    position: { x: 7, z: 11 },
    state: { plantType: "carrot", growth: 0.5 }
  },
  crop_2: {
    id: "crop_2",
    type: "crop",
    position: { x: 8, z: 11 },
    state: { plantType: "carrot", growth: 0.2 }
  },
  crop_3: {
    id: "crop_3",
    type: "crop",
    position: { x: 32, z: 32 },
    state: { plantType: "corn", growth: 0.8 }
  }
};
