import { CUBE_ACTION, getActionByKey, handleCubeAction } from '@/utils';
import { useFrame } from '@react-three/fiber';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AxesHelper, Mesh } from 'three';

const Cube = () => {
  const [action, setAction] = useState(CUBE_ACTION.IDLE);

  const ref = useRef<Mesh>(null);

  useFrame((_state, delta) => {
    if (!ref.current) return;

    handleCubeAction({ action, delta, cube: ref.current });
  });

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    setAction(getActionByKey(e.key.toLowerCase()));
  }, []);

  const onKeyUp = useCallback(() => {
    setAction(CUBE_ACTION.IDLE);
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
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
