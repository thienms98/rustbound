import { GROWING_STAGE, type Plot as PlotType } from "@/lib/farming";
import { useFarm } from "@/store";
import { Edges, Html } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";
import { useEffect, useState } from "react";
import Crop from "../Crop";

export const GROWING_STAGES = {
  [GROWING_STAGE.GROWTH]: 1,
  [GROWING_STAGE.SEEDLING]: 0.7,
  [GROWING_STAGE.SPROUT]: 0.3,
  [GROWING_STAGE.SEED]: 0
};

const Plot = ({
  isIntersect,
  plot,
  ...props
}: ThreeElements["group"] & { isIntersect: boolean; plot: PlotType }) => {
  const updatePlot = useFarm((state) => state.updatePlot);
  const [timeLeft, setTimeLeft] = useState(plot.plant?.growthTime || 0);

  useEffect(() => {
    if (!plot.plant || !plot.plantedAt || timeLeft < 0) return;
    const timeout = setTimeout(() => {
      const now = Date.now();

      const remaining = plot.plant!.growthTime - (now - plot.plantedAt!);
      const percentage = remaining / plot.plant!.growthTime;
      setTimeLeft(Math.max(remaining, 0));

      const stage = Object.entries(GROWING_STAGES).find(
        ([_key, value]) => 1 - percentage >= value
      )?.[0] as GROWING_STAGE;

      if (stage != plot.stage)
        updatePlot({
          ...plot,
          stage
        });
    }, 500);

    return () => clearTimeout(timeout);
  }, [isIntersect, timeLeft, plot, updatePlot]);

  return (
    <group {...props}>
      <mesh position={[0, 0.15, 0]} name="soil" userData={plot}>
        <boxGeometry args={[4, 0.3, 4]} />
        <meshStandardMaterial color={"#826031"} />
        {isIntersect && (
          <Edges linewidth={4} scale={1.1} threshold={15} color="white" />
        )}
        d
      </mesh>
      {plot.plant && (
        <>
          <Crop plant={plot.plant} stage={plot.stage} />
          {isIntersect && (
            <Html position={[0, 3, 0]} center>
              <div className="w-12.5 h-1.5">
                <div>
                  {plot.plant.name} : {Math.round(timeLeft / 1000)}ms
                </div>
              </div>
            </Html>
          )}
        </>
      )}
    </group>
  );
};

export default Plot;
