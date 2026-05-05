import { ThreeElements } from "@react-three/fiber";
import { forwardRef } from "react";
import { Mesh } from "three";

const Ground = forwardRef<Mesh, ThreeElements["mesh"]>((props, ref) => {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[10, 0, 10]}
      ref={ref}
      {...props}
    >
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial transparent opacity={0} />
    </mesh>
  );
});

Ground.displayName = "Ground";
export default Ground;
