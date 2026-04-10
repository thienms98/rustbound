import { Resource } from "@/components/Resources";
import { Object3D, Vector2, Vector3 } from "three";

const MINIMUM_DISTANCE = 5;
const MAX_HP = 5;

const getDistance = (A: Object3D, B: Object3D) => {
  return Math.sqrt(
    Math.pow(A.position.x - B.position.x, 2) +
      Math.pow(A.position.z - B.position.z, 2)
  );
};

const spawnResource = (
  type: string,
  restrictedArea = [new Vector2(-50, 50), new Vector2(-50, 50)]
): Resource => {
  const [vec1, vec2] = restrictedArea;
  const { xMax, xMin, zMax, zMin } = {
    xMin: Math.min(vec1.x, vec2.x),
    xMax: Math.max(vec1.x, vec2.x),
    zMin: Math.min(vec1.y, vec2.y),
    zMax: Math.max(vec1.y, vec2.y)
  };

  const xRange = xMax - xMin;
  const zRange = zMax - zMin;

  const position = new Vector3(
    xMin + Math.random() * xRange,
    0,
    zMin + Math.random() * zRange
  );

  const newResource = {
    id: "random-id",
    type,
    position,
    hp: MAX_HP,
    maxHp: MAX_HP,
    alive: true
  };

  return newResource;
};
