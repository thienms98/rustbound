import { type Plot as PlotType } from "@/lib/farming";
import { Edges, Html } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";
import { useMemo } from "react";

const now = Date.now();

const Plot = ({
  isIntersect,
  plot,
  ...props
}: ThreeElements["group"] & { isIntersect: boolean; plot: PlotType }) => {
  const hpLeft = useMemo(() => {}, [plot]);

  return (
    <group {...props}>
      <mesh position={[0, 0.15, 0]} name="soil" userData={plot}>
        <boxGeometry args={[4, 0.3, 4]} />
        <meshStandardMaterial color={"brown"} />
        {isIntersect && (
          <Edges linewidth={4} scale={1.1} threshold={15} color="white" />
        )}
        d
      </mesh>
      {plot.plant && (
        <>
          <mesh position={[0, 1.5, 0]}>
            <boxGeometry args={[0.5, 3, 0.5]} />
            <meshStandardMaterial color={"gray"} />
          </mesh>
          <Html position={[0, 3, 0]} center>
            <div className="w-12.5 h-1.5 bg-green-50">
              <div
                className="h-full bg-green-500"
                style={{
                  width: `${((now - (plot.plantedAt || 0)) / plot.plant.growthTime) * 100}%`
                }}
              />
            </div>
          </Html>
        </>
      )}
    </group>
  );
};

export default Plot;
