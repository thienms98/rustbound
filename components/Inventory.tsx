import { useInventory } from "@/store";
import InventoryItem from "./InventoryItem";
import { v4 } from "uuid";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const Inventory = () => {
  const items = useInventory((state) => state.items);
  const [inventory, setInventory] = useState(false);
  const [dragItem, setDragItem] = useState<number>();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (["b", "tab"].includes(e.key.toLowerCase())) {
        e.preventDefault();
        setInventory((prev) => !prev);
      }

      if (["escape"].includes(e.key.toLowerCase())) {
        setInventory(false);
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
        "fixed top-20 left-2 gap-4 bg-white/50 backdrop-blur-2xl p-2 rounded-lg text-black text-sm grid grid-cols-5 select-none",
        inventory ? "" : "hidden"
      )}
    >
      {items.map((item, idx) => {
        return (
          <InventoryItem
            key={item?.id || v4()}
            {...item}
            order={idx}
            dragItem={dragItem}
            setDragItem={setDragItem}
          />
        );
      })}
    </div>
  );
};

export default Inventory;
