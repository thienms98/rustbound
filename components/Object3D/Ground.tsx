import { Sky, useTexture } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { RepeatWrapping } from "three";

const Ground = () => {
  const texture = useTexture("./Ground.png", (t) => {
    t.wrapS = RepeatWrapping;
    t.wrapT = RepeatWrapping;
    t.repeat.set(50, 50);
  });

  return (
    <RigidBody type="fixed">
      {/* <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[300, 300]} />
        <meshStandardMaterial map={texture} />
      </mesh> */}

      {/* Ground chính */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="green" />
      </mesh>

      {/* Ground phụ */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <planeGeometry args={[400, 400]} />
        <meshBasicMaterial color="#88aa88" />
      </mesh>
    </RigidBody>
  );
};

export default Ground;
