import { forwardRef } from "react";
import { AxesHelper, Mesh } from "three";

const Cube = forwardRef<Mesh>((_, ref) => {
  return (
    <mesh ref={ref}>
      <primitive object={new AxesHelper(2)} />
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="white" />
      {/* 6 mặt */}
      <meshStandardMaterial attach="material-0" color="white" /> {/* right */}
      <meshStandardMaterial attach="material-1" color="white" /> {/* left */}
      <meshStandardMaterial attach="material-2" color="white" /> {/* top */}
      <meshStandardMaterial attach="material-3" color="white" /> {/* bottom */}
      <meshStandardMaterial attach="material-4" color="red" /> {/* front */}
      <meshStandardMaterial attach="material-5" color="white" /> {/* back */}
    </mesh>
  );
});

Cube.displayName = "Cube";
export default Cube;
