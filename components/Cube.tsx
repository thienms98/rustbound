import { Character } from "@/types/character";
import {
  getInputClearState,
  getInputState,
  updatePosition,
  updateVelocity
} from "@/utils/movement";
import { useFrame } from "@react-three/fiber";
import { useCallback, useEffect, useRef } from "react";
import { AxesHelper, Mesh } from "three";

const Cube = () => {
  const ref = useRef<Mesh>(null);
  const characterRef = useRef<Character>({
    direction: 0,
    rotation: 0,
    velocity: {
      x: 0,
      z: 0
    }
  });

  useFrame((_state, delta) => {
    if (!ref.current) return;

    const character = characterRef.current;

    const payload = {
      cube: ref.current,
      delta,
      ...character
    };

    updateVelocity(payload);
    updatePosition(payload);
  });

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    characterRef.current = {
      ...characterRef.current,
      ...getInputState(e.key.toLowerCase())
    };
  }, []);

  const onKeyUp = useCallback((e: KeyboardEvent) => {
    characterRef.current = {
      ...characterRef.current,
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
};

export default Cube;
