import { useGLTF } from "@react-three/drei";

export const useFarmAssets = () => {
  const { nodes } = useGLTF("crops.glb");

  return {
    nodes
  };
};
