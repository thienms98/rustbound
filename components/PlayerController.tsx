import Player from './Object3D/Player';
import Resources, { type Resource } from './Object3D/Resources';
import { initialStats, updateCameraPosition, updatePosition, getDirections, updateRotation } from '@/lib/movement';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { Object3D, Raycaster } from 'three';
import { useInventory } from '@/store/inventory';
import { getRaycastedIntersects } from '@/lib/raycaster';
import { getCloseIntersects, getRespawnResource, initialSpawn } from '@/lib/resource';
import { CharacterAction } from '@/types/character';
import { RapierRigidBody } from '@react-three/rapier';
import { ATTACK_TIME, handleAttack, handleAttackCooldown, onObjectHit } from '@/lib/attack';
import { handleAnimation } from '@/lib/animation';

const PlayerController = () => {
  const addItem = useInventory((state) => state.addItem);

  const playerRef = useRef<RapierRigidBody>(null);
  const objectsRef = useRef<Object3D>(null);
  const statsRef = useRef(initialStats);
  const keysRef = useRef<Set<string>>(new Set());

  const [resources, setResources] = useState<Resource[]>(initialSpawn());
  const [targets, setTargets] = useState<string[]>([]);
  const [actions, setActions] = useState<CharacterAction[]>([]);

  const [animation, setAnimation] = useState<'root|Girl_Idle' | 'root|Girl_walk' | 'root|Girl_run'>('root|Girl_Idle');

  const raycasterRef = useRef(new Raycaster());

  useFrame(({ camera }, delta) => {
    if (!playerRef.current) return;

    const direction = getDirections(keysRef.current);
    const isSprint = keysRef.current.has('shift');
    const payload = {
      player: playerRef.current,
      objects: objectsRef.current ? objectsRef.current.children : [],
      keys: keysRef.current,
      raycaster: raycasterRef.current,
      resources,
      delta,
      camera,
      direction,
      isSprint,
    };

    updateRotation(payload);
    updatePosition(payload);
    updateCameraPosition(payload);
    setAnimation(handleAnimation(payload));
    statsRef.current.attackCooldown = handleAttackCooldown(statsRef.current.attackCooldown, delta);

    let newResources = [...resources];

    if (objectsRef.current) {
      const intersects = getRaycastedIntersects(payload);

      setTargets(getCloseIntersects(playerRef.current, intersects));
      if (keysRef.current.has('e') && statsRef.current.attackCooldown <= 0) {
        handleAttack({
          intersects,
          onHit: (object) => {
            newResources = onObjectHit(object, newResources, addItem);
          },
        });
        statsRef.current.attackCooldown = ATTACK_TIME;
      }
    }

    newResources = getRespawnResource(newResources);
    setResources(newResources);
  });

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      keysRef.current.add(e.key.toLowerCase());
    };

    const onKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key.toLowerCase());
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  return (
    <>
      <Player ref={playerRef} animation={animation} />
      <Resources ref={objectsRef} targets={targets} resources={resources} />
    </>
  );
};

export default PlayerController;
