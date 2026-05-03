export type TileType = "grass" | "soil" | "water" | "path";

export type Tile = {
  type: TileType;
  state?: {
    tilled?: boolean;
    watered?: boolean;
  };
};

export type Grid = Tile[][];
