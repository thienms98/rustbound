import { ThreeElements } from "@react-three/fiber";

const Plot = (props: ThreeElements["group"]) => {
  return (
    <group {...props}>
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[4, 0.3, 4]} />
        <meshStandardMaterial color={"brown"} />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[0.5, 3, 0.5]} />
        <meshStandardMaterial color={"gray"} />
      </mesh>
    </group>
  );
};

export default Plot;
