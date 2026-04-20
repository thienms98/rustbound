import Player from "./Object3D/Player";
import Resources, { type Resource } from "./Object3D/Resources";
import {
  initialStats,
  updateCameraPosition,
  updatePosition,
  getDirections,
  updateRotation
} from "@/lib/movement";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Object3D, Raycaster } from "three";
import { useInventory } from "@/store/inventory";
import { getRespawnResource, initialSpawn, ResourceType } from "@/lib/resource";
import { RapierRigidBody } from "@react-three/rapier";
import { handleAttack } from "@/lib/attack";
import { handleAnimation } from "@/lib/animation";

const PlayerController = () => {
  const addItem = useInventory((state) => state.addItem);

  const playerRef = useRef<RapierRigidBody>(null);
  const objectsRef = useRef<Object3D>(null);
  const statsRef = useRef(initialStats);
  const keysRef = useRef<Set<string>>(new Set());

  const [resources, setResources] = useState<Resource[]>(initialSpawn());
  const [targets, setTargets] = useState<string[]>([]);

  const [animation, setAnimation] = useState<
    "root|Girl_Idle" | "root|Girl_walk" | "root|Girl_run"
  >("root|Girl_Idle");

  const raycasterRef = useRef(new Raycaster());

  useFrame(({ camera }, delta) => {
    if (!playerRef.current) return;

    const direction = getDirections(keysRef.current);
    const isSprint = keysRef.current.has("shift");
    const payload = {
      player: playerRef.current,
      objects: objectsRef.current ? objectsRef.current.children : [],
      keys: keysRef.current,
      stats: statsRef.current,
      raycaster: raycasterRef.current,
      resources,
      delta,
      camera,
      direction,
      isSprint
    };

    updateRotation(payload);
    updatePosition(payload);
    updateCameraPosition(payload);
    setAnimation(handleAnimation(payload));

    const attackResults = handleAttack(payload, (items) => {
      // TODO: Thêm hàm addItems để tránh async do setState khi có nhiều type cũng lúc //
      Object.entries(items).forEach(([type, quantity]) => {
        console.log("🚀 ~ PlayerController ~ type, quantity:", type, quantity);
        addItem(type, quantity);
      });
    });

    const { inRangeObjects } = attackResults;
    setTargets(inRangeObjects);

    let { resources: newResources } = attackResults;
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
      <Player ref={playerRef} animation={animation} />
      <Resources ref={objectsRef} targets={targets} resources={resources} />
    </>
  );
};

export default PlayerController;
