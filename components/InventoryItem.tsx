import {
  ASSET_SIZE,
  getResourceAssetPosition,
  type InventoryItem as InventoryItemType
} from "@/lib/inventory";
import { useMemo } from "react";

const InventoryItem = (props: InventoryItemType) => {
  const position = useMemo(
    () =>
      Number.isInteger(props.type)
        ? getResourceAssetPosition(props.type)
        : null,
    [props.type]
  );
  console.log("🚀 ~ InventoryItem ~ position:", position);

  return (
    <div className="relative w-10 h-10 flex items-center justify-center border rounded-lg">
      <div
        style={
          {
            width: ASSET_SIZE,
            height: ASSET_SIZE,
            backgroundImage:
              Number.isInteger(props.type) && 'url("/itemset.png")',
            backgroundPosition: position && `${position.x}px ${position.y}px`
          } as React.CSSProperties
        }
      ></div>
      <div className="absolute bottom-0.5 right-0.5 text-white font-semibold">
        {props.quantity ? `x${props.quantity}` : ""}
      </div>
    </div>
  );
};

export default InventoryItem;
