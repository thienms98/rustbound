import { CROP } from "@/components/objects/Crop";
import * as Three from "three";

export const getCropMesh = (
  nodes: { [key: string]: Three.Object3D },
  cropType: CROP,
  stage: number
) => {
  return nodes[`${cropType}_F${stage}`];
};
