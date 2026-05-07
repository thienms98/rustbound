import { useFarmAssets } from "@/hooks/useFarmAssets";
import { Box3, Vector3 } from "three";

export enum CROP {
  CARROT = "Carrot",
  POTATO = "Potatoe",
  WHEAT = "Wheat",
  TOMATO = "Tomato"
}

const TILE_SIZE = 1;

const Crop = ({ name, position }: { name: string; position: Vector3 }) => {
  const { nodes } = useFarmAssets();
  const mesh = nodes[name];

  const footprint = new Vector3(1, 1, 1);

  console.log(mesh);
  if (!mesh) return null;
  const box = new Box3().setFromObject(mesh);
  const size = new Vector3();
  box.getSize(size);

  const scaleX = (footprint.x * TILE_SIZE) / size.x;

  return <primitive object={mesh} position={position} scale={scaleX} />;
};
export default Crop;
