import { useInventory } from "@/store/inventory";
import InventoryItem from "./InventoryItem";
import {
  type InventoryItem as InventoryItemType,
  MAX_SLOT
} from "@/lib/inventory";
import { v4 } from "uuid";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const Inventory = () => {
  const items = useInventory((state) => state.items);
  const [inventory, setInventory] = useState(false);
  const [dragItem, setDragItem] = useState<InventoryItemType>();

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
        "fixed top-2 left-2 gap-4 bg-white/50 backdrop-blur-2xl p-2 rounded-lg text-black text-sm grid grid-cols-5 select-none",
        inventory ? "" : "hidden"
      )}
    >
      {Array.from({ length: MAX_SLOT }).map((_, i) => {
        const item = items[i];
        return (
          <InventoryItem
            key={item?.id || v4()}
            {...item}
            dragItem={dragItem}
            setDragItem={setDragItem}
          />
        );
      })}
    </div>
  );
};

export default Inventory;
