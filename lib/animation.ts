import { Vector2 } from "three";

export const handleAnimation = (payload: {
  keys: Set<string>;
  direction: Vector2;
}) => {
  const { direction, keys } = payload;
  const isSprint = keys.has("shift");

  if (!direction.length()) return "idle";
  if (isSprint) return "running";
  else return "walking";
};
