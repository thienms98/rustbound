import {
  ASSET_SIZE,
  getResourceAssetPosition,
  type InventoryItem as InventoryItemType
} from "@/lib/inventory";
import { useInventory } from "@/store/inventory";
import { useEffect, useMemo, useRef } from "react";

interface Props {
  dragItem?: InventoryItemType;
  setDragItem: React.Dispatch<
    React.SetStateAction<InventoryItemType | undefined>
  >;
}

const InventoryItem = ({
  dragItem,
  setDragItem,
  ...item
}: InventoryItemType & Props) => {
  const swapItem = useInventory((state) => state.swapItem);
  const ref = useRef<HTMLDivElement>(null);
  const position = useMemo(
    () =>
      Number.isInteger(item.type) ? getResourceAssetPosition(item.type) : null,
    [item.type]
  );

  useEffect(() => {
    const inventoryItem = ref.current;

    const onDragOver = (e: MouseEvent) => {
      e.preventDefault();
    };

    const onDrag = () => {
      setDragItem(item);
    };
    const onDrop = () => {
      console.log("drop: ", item);
      if (dragItem) swapItem(dragItem, item);
    };

    inventoryItem?.addEventListener("drag", onDrag);
    inventoryItem?.addEventListener("drop", onDrop);
    inventoryItem?.addEventListener("dragover", onDragOver);

    return () => {
      inventoryItem?.removeEventListener("drag", onDrag);
      inventoryItem?.removeEventListener("drop", onDrop);
      inventoryItem?.removeEventListener("dragover", onDragOver);
    };
  }, [dragItem, item, setDragItem, swapItem]);

  return (
    <div
      className="relative flex items-center justify-center w-10 h-10 border rounded-lg"
      ref={ref}
      draggable
    >
      <div
        style={
          {
            order: item.order,
            width: ASSET_SIZE,
            height: ASSET_SIZE,
            backgroundImage:
              Number.isInteger(item.type) && 'url("/itemset.png")',
            backgroundPosition: position && `${position.x}px ${position.y}px`
          } as React.CSSProperties
        }
      ></div>
      <div className="absolute bottom-0.5 right-0.5 text-white font-semibold">
        {item.quantity ? `x${item.quantity}` : ""}
      </div>
    </div>
  );
};

export default InventoryItem;
