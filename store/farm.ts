import { GROWING_STAGE, Plant, Plot } from "@/lib/farming";
import { Vector3 } from "three";
import { v4 } from "uuid";
import { create } from "zustand";

export const PLOT_SIZE = 5;
export const FARM_COLUMNS = 5;

const initialPlots = (() => {
  const plots: Plot[] = [];
  let x = 0,
    z = 0;
  for (let i = 0; i < 20; i++) {
    x = i % FARM_COLUMNS;
    z = Math.floor(i / FARM_COLUMNS);

    plots.push({
      id: v4(),
      stage: GROWING_STAGE.SOIL,
      position: new Vector3(x * PLOT_SIZE, 0, z * PLOT_SIZE)
    });
  }

  return plots;
})();

interface Farm {
  plots: Plot[];
  handSeed: Plant | null;
  updatePlot: (plot: Plot) => void;
}

export const useFarm = create<Farm>((set) => ({
  plots: initialPlots,
  handSeed: null,
  setHandSeed: (seed: Plant | null) =>
    set(() => ({
      handSeed: seed
    })),
  updatePlot: (plot: Plot) =>
    set((state) => ({
      plots: state.plots.map((p) => (p.id === plot.id ? plot : p))
    }))
}));
