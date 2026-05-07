import { Vector2 } from "three";

export const isInsideRectangle = (pos: Vector2, min: Vector2, max: Vector2) =>
  pos.x <= max.x && pos.x >= min.x && pos.y <= max.y && pos.y >= min.y;
