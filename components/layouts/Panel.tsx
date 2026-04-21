import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Inventory from "./Inventory";

const Panel = () => {
  const [panel, setPanel] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (["b", "tab"].includes(e.key.toLowerCase())) {
        e.preventDefault();
        setPanel((prev) => !prev);
      }

      if (["escape"].includes(e.key.toLowerCase())) {
        setPanel(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-screen h-screen gap-4 bg-white/50 backdrop-blur-xl p-20 rounded-lg text-black text-sm select-none",
        panel ? "" : "hidden"
      )}
      style={{
        top: 0,
        left: 0
      }}
    >
      íadljasdlkj
      <Inventory />
    </div>
  );
};

export default Panel;
