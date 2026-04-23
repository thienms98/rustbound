import { forwardRef } from "react";
import Plot from "./Plot";
import { Object3D } from "three";
import { useFarm } from "@/store/plots";

const Farm = forwardRef<Object3D, { targets: string[] }>(({ targets }, ref) => {
  const plots = useFarm((state) => state.plots);

  return (
    <group ref={ref}>
      {plots.map((plot) => (
        <Plot
          key={plot.id}
          position={plot.position}
          plot={plot}
          isIntersect={targets.includes(plot.id)}
        />
      ))}
    </group>
  );
});

Farm.displayName = "Farm";
export default Farm;
