import Player from "./Object3D/Player";
import Resources, { type Resource } from "./Object3D/Resources";
import {
  initialStats,
  updateCameraPosition,
  updatePosition,
  updateVelocity,
  getDirections,
  updateRotation
} from "@/lib/movement";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Object3D, Raycaster } from "three";
import { useInventory } from "@/store/inventory";
import { getRaycastedIntersects } from "@/lib/raycaster";
import {
  getCloseIntersects,
  getRespawnResource,
  initialSpawn
} from "@/lib/resource";
import { CharacterAction } from "@/types/character";
import { RapierRigidBody } from "@react-three/rapier";
import { ATTACK_TIME, handleAttack } from "@/lib/attack";

const PlayerController = () => {
  const addItem = useInventory((state) => state.addItem);

  const playerRef = useRef<RapierRigidBody>(null);
  const objectsRef = useRef<Object3D>(null);
  const statsRef = useRef(initialStats);
  const keysRef = useRef<Set<string>>(new Set());

  const [resources, setResources] = useState<Resource[]>(initialSpawn());
  const [targets, setTargets] = useState<string[]>([]);
  const [actions, setActions] = useState<CharacterAction[]>([]);

  const raycasterRef = useRef(new Raycaster());

  const handleObjectHit = (object: Object3D, resources: Resource[]) => {
    const updatedResources = resources.map((item) =>
      item.id === object.userData.id
        ? {
            ...item,
            hp: Math.max(item.hp - 1, 0),
            alive: Boolean(Math.max(item.hp - 1, 0)),
            respawnAt: Date.now() + 10000
          }
        : item
    );

    if (object.userData.hp - 1 <= 0) addItem(object.userData.type, 1);

    return updatedResources;
  };

  useFrame(({ camera }, delta) => {
    if (!playerRef.current) return;

    const { forward, right } = getDirections(keysRef.current);
    const payload = {
      player: playerRef.current,
      velocity: statsRef.current.velocity,
      angle: statsRef.current.angle,
      objects: objectsRef.current ? objectsRef.current.children : [],
      raycaster: raycasterRef.current,
      delta,
      camera,
      forward,
      right
    };
    statsRef.current.angle = updateRotation(
      playerRef.current,
      statsRef.current.angle,
      right
    );
    updateVelocity(payload);
    updatePosition(payload);
    updateCameraPosition(payload);

    statsRef.current.attackCooldown -= delta;
    statsRef.current.attackCooldown = Math.max(
      statsRef.current.attackCooldown,
      0
    );

    let newResources = [...resources];

    if (objectsRef.current) {
      const intersects = getRaycastedIntersects(payload);

      setTargets(getCloseIntersects(playerRef.current, intersects));
      if (keysRef.current.has("e") && statsRef.current.attackCooldown === 0) {
        handleAttack({
          intersects,
          onHit: (object) => {
            newResources = handleObjectHit(object, newResources);
          }
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

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  return (
    <>
      <Player ref={playerRef} />
      <Resources ref={objectsRef} targets={targets} resources={resources} />
    </>
  );
};

export default PlayerController;
