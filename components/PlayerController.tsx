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
import Farm from "./Object3D/Farm";
import { plantCrop, Plot, raycastPlots } from "@/lib/farming";
import { v4 } from "uuid";
import { useFarm } from "@/store/plots";

const PlayerController = () => {
  const addItem = useInventory((state) => state.addItem);
  const updatePlot = useFarm((state) => state.updatePlot);

  const playerRef = useRef<RapierRigidBody>(null);
  const objectsRef = useRef<Object3D>(null);
  const statsRef = useRef(initialStats);
  const keysRef = useRef<Set<string>>(new Set());
  const plotsRef = useRef<Object3D>(null);

  // const [resources, setResources] = useState<Resource[]>(initialSpawn());
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
      plots: plotsRef.current,
      // resources,
      delta,
      camera,
      direction,
      isSprint
    };

    updateRotation(payload);
    updatePosition(payload);
    updateCameraPosition(payload);
    setAnimation(handleAnimation(payload));

    // const attackResults = handleAttack(payload, (items) => {
    //   // TODO: Thêm hàm addItems để tránh async do setState khi có nhiều type cũng lúc
    //   Object.entries(items).forEach(([type, quantity]) => {
    //     if (quantity) addItem(type as unknown as ResourceType, quantity);
    //   });
    // });

    // if (!attackResults) return;

    // const { inRangeObjects } = attackResults;
    // setTargets(inRangeObjects);

    // let { resources: newResources } = attackResults;
    // newResources = getRespawnResource(newResources);
    // setResources(newResources);

    const target = raycastPlots(payload);
    setTargets(target ? [target.userData.id] : []);
    if (target && keysRef.current.has("e")) {
      const plot = target.userData as Plot;
      if (plot.plant && plot.plantedAt) {
        const now = Date.now();
        const havestTime = plot.plantedAt + plot.plant.growthTime;
        console.log({
          havestTime,
          now
        });

        if (now >= havestTime) {
          updatePlot({
            ...plot,
            plant: undefined,
            plantedAt: undefined
          });
        } else {
          console.log(havestTime - now, "ms left");
        }
      } else {
        const newPlot = plantCrop(plot, {
          id: v4(),
          name: "carrot",
          type: "crop",
          category: "crop",
          growthTime: 60000
        });
        updatePlot(newPlot);
      }
    }
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
      {/* <Resources ref={objectsRef} targets={targets} resources={resources} /> */}
      <Farm ref={plotsRef} targets={targets} />
    </>
  );
};

export default PlayerController;
