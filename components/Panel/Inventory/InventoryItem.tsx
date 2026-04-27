import { ASSET_SIZE, getResourceAssetPosition, splitSlot, type InventoryItem as InventoryItemType } from '@/lib/inventory';
import { useInventory } from '@/store';
import { MouseEventHandler, useEffect, useMemo, useRef } from 'react';

interface Props {
  order: number;
  dragItem?: number;
  setDragItem: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const InventoryItem = ({ dragItem, setDragItem, order, ...item }: InventoryItemType & Props) => {
  const swapItem = useInventory((state) => state.swapItem);
  const splitItem = useInventory((state) => state.splitItem);

  const position = useMemo(() => {
    return item.type ? getResourceAssetPosition(item.type) : null;
  }, [item.type]);

  const onClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    if (e.shiftKey) {
      splitItem(order);
    }
  };

  const onDragOver: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };

  const onDrag = () => {
    setDragItem(order);
  };
  const onDrop = () => {
    if (typeof dragItem !== 'number') return;
    swapItem(dragItem, order);
    setDragItem(undefined);
  };

  const itemStyle: React.CSSProperties = {
    width: ASSET_SIZE,
    height: ASSET_SIZE,
    backgroundImage: item.type ? 'url("/itemset.png")' : 'none',
    backgroundPosition: position ? `${position.x}px ${position.y}px` : '0 0',
  };

  return (
    <div
      className="relative flex items-center justify-center w-10 h-10 border rounded-lg"
      draggable={!!item.type}
      onClick={onClick}
      onDrag={onDrag}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      {item.type ? <div style={itemStyle} /> : null}

      {item.quantity && item.quantity > 1 ? <div className="absolute bottom-0.5 right-0.5 text-black font-semibold text-xs">x{item.quantity}</div> : null}
    </div>
  );
};

export default InventoryItem;
