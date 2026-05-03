import { createNoise2D } from "simplex-noise";
import { Entity, EntityMap, OccupancyMap } from "@/types/entity";

export const ENTITY_DEFS = {
  tree: {
    size: { width: 1, height: 1 },
    harvestable: true
  },
  crop: {
    growable: true
  }
};

const occupancy: OccupancyMap = {};
const entities: EntityMap = {};

const noise2D = createNoise2D();

type TileType = "water" | "grass" | "farm" | "path";

const TILE_MAP = {
  w: "water",
  g: "grass",
  f: "soil",
  p: "path"
} as const;

type Tile = {
  type: TileType;
};

export const MAIN_LAYOUT = [
  "gggggggggggggggggggggggggggggggggggggggggggggggggg", // 0
  "gggggggggggggggggggggggggggggggggggggggggggggggggg",
  "gggggggggggggggggggggggggggggggggggggggggggggggggg",
  "gggggggggggggggggggggggggggggggggggggggggggggggggg",
  "ggggggggggggggggggggggwwwwwwgggggggggggggggggggggg",
  "ggggggggggggggggggggwwwwwwwwwwgggggggggggggggggggg",
  "gggggggggggggggggggggwwwwwwwwggggggggggggggggggggg",
  "ggggggggggggggggggggggwwwwwwgggggggggggggggggggggg",
  "ggggggggggggggggggggggggpggggggggggggggggggggggggg",
  "ggggggggggggggggggggggggpggggggggggggggggggggggggg",
  "ggggggffffffffffgggggggpgggggggffffffffffggggggggg", // 10
  "ggggggffffffffffgggggggpgggggggffffffffffggggggggg",
  "ggggggffffffffffgggggggpgggggggffffffffffggggggggg",
  "ggggggffffffffffgggggggpgggggggffffffffffggggggggg",
  "ggggggggggggggggggggggggpggggggggggggggggggggggggg",
  "ggggggggggggggggggggggggpggggggggggggggggggggggggg",
  "pppppppppppppppppppppppppppppppppppppppppppppppppp", // Trục lộ ngang
  "pppppppppppppppppppppppppppppppppppppppppppppppppp", // 17
  "ggggggggggggggggggggggggpggggggggggggggggggggggggg",
  "ggggggggggggggggggggggggpggggggggggggggggggggggggg",
  "gggggggggggggggggggggggpgggggggggggggggggggggggggg", // 20 - Khu vực nhà ở
  "gggggggggggggggggggggggpgggggggggggggggggggggggggg",
  "gggggggggggggggggggggggpgggggggggggggggggggggggggg",
  "gggggggggggggggggggggggpgggggggggggggggggggggggggg",
  "gggggggggggggggggggggggpgggggggggggggggggggggggggg",
  "pppppppppppppppppppppppppppppppppppppppppppppppppp", // Trục lộ ngang 2
  "gggggggggggggggggggggggpgggggggggggggggggggggggggg",
  "gggggggggggggggggggggggpgggggggggggggggggggggggggg",
  "gggggggggggggggggggggggpgggggggggggggggggggggggggg",
  "gggggggggggggggggggggggpgggggggggggggggggggggggggg",
  "ggggggffffffffffgggggggpgggggggffffffffffggggggggg", // 30
  "ggggggffffffffffgggggggpgggggggffffffffffggggggggg",
  "ggggggffffffffffgggggggpgggggggffffffffffggggggggg",
  "ggggggffffffffffgggggggpgggggggffffffffffggggggggg",
  "ggggggggggggggggggggggggpggggggggggggggggggggggggg",
  "ggggggggggggggggggggggggpggggggggggggggggggggggggg",
  "ggggggggggggggggggggggggpggggggggggggggggggggggggg",
  "ggggggggggggggggggggggggpggggggggggggggggggggggggg",
  "gggggggggggggggggggggggpgggggggggggggggggggggggggg",
  "gggggggggggggggggggggggpgggggggggggggggggggggggggg",
  "ggggggggggggggggggggggggpggggggggggggggggggggggggg", // 40
  "ggggggggggggggggggggggggpggggggggggggggggggggggggg",
  "ggggggggggggggggggggggggpggggggggggggggggggggggggg",
  "ggggggggggggggggggggggggpggggggggggggggggggggggggg",
  "ggggggggggggggggggggggggpggggggggggggggggggggggggg",
  "ggggggggggggggggggggggggpggggggggggggggggggggggggg",
  "ggggggggggggggggggggggggpggggggggggggggggggggggggg",
  "ggggggggggggggggggggggggpggggggggggggggggggggggggg",
  "ggggggggggggggggggggggggpggggggggggggggggggggggggg",
  "ggggggggggggggggggggggggpggggggggggggggggggggggggg" // 49
];

export function generateFromLayout(layout: string[]): Tile[][] {
  return layout.map((row) =>
    row.split("").map((char) => ({
      type: TILE_MAP[char as keyof typeof TILE_MAP]
    }))
  );
}

export function generateGrid(width: number, height: number): Tile[][] {
  const grid: Tile[][] = [];

  const scale = 0.1; // càng nhỏ → map càng mượt

  for (let x = 0; x < width; x++) {
    const row: Tile[] = [];

    for (let z = 0; z < height; z++) {
      const noise = noise2D(x * scale, z * scale);

      let type: TileType;

      if (noise < -0.8) {
        type = "water";
      } else if (noise > 0.3) {
        type = "soil";
      } else {
        type = "grass";
      }

      row.push({ type });
    }

    grid.push(row);
  }

  return grid;
}

function isTileFree(x: number, z: number) {
  return !occupancy[key(x, z)];
}

function placeEntity(entity: Entity) {
  const { x, z } = entity.position;

  occupancy[key(x, z)] = entity.id;
  entities[entity.id] = entity;
}
