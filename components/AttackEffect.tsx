import { ATTACK_RANGE } from "@/lib/attack";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { RingGeometry } from "three";

const AttackEffect = ({}) => {
  const splashRef = useRef<RingGeometry>(null);

  useFrame(() => {});

  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry
        ref={splashRef}
        args={[ATTACK_RANGE - 0.5, ATTACK_RANGE, 30, 1, 0, Math.PI]}
      />
      <meshBasicMaterial color="yellow" transparent opacity={0.5} side={2} />
    </mesh>
  );
};

export default AttackEffect;
