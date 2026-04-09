import { CharacterStats } from "@/types/character";
import {
  getInputClearState,
  getInputState,
  updatePosition,
  updateVelocity
} from "@/utils/movement";
import { useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useRef } from "react";
import { AxesHelper, Mesh } from "three";

const Cube = () => {
  const cubeRef = useRef<Mesh>(null);
  const statsRef = useRef<CharacterStats>({
    direction: 0,
    rotation: 0,
    velocity: {
      x: 0,
      z: 0
    }
  });

  // const { camera } = useThree();

  useFrame(({ camera }, delta) => {
    if (!cubeRef.current) return;

    const payload = {
      cube: cubeRef.current,
      delta,
      ...statsRef.current
    };

    updateVelocity(payload);
    updatePosition(payload);

    camera.position.x = cubeRef.current.position.x;
    camera.position.y = cubeRef.current.position.y + 20;
    camera.position.z = cubeRef.current.position.z + 30;

    camera.lookAt(cubeRef.current.position);
  });

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    statsRef.current = {
      ...statsRef.current,
      ...getInputState(e.key.toLowerCase())
    };
  }, []);

  const onKeyUp = useCallback((e: KeyboardEvent) => {
    statsRef.current = {
      ...statsRef.current,
      ...getInputClearState(e.key.toLowerCase())
    };
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  }, [onKeyDown, onKeyUp]);

  return (
    <mesh ref={cubeRef}>
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
};

export default Cube;
