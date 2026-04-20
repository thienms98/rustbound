import { Vector2 } from 'three';

export const handleAnimation = (payload: { keys: Set<string>; direction: Vector2 }) => {
  const { direction, keys } = payload;
  const isSprint = keys.has('shift');

  if (!direction.length()) return 'root|Girl_Idle';
  if (isSprint) return 'root|Girl_run';
  else return 'root|Girl_walk';
};
