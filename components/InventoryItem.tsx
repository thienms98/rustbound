import { ASSET_SIZE, getResourceAssetPosition, type InventoryItem as InventoryItemType } from '@/lib/inventory';
import { useInventory } from '@/store/inventory';
import { useEffect, useRef } from 'react';

interface Props {
  order: number;
  dragItem?: number;
  setDragItem: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const InventoryItem = ({ dragItem, setDragItem, order, ...item }: InventoryItemType & Props) => {
  const swapItem = useInventory((state) => state.swapItem);
  const ref = useRef<HTMLDivElement>(null);
  const position = 'type' in item && item.type ? getResourceAssetPosition(item.type) : null;

  useEffect(() => {
    const inventoryItem = ref.current;

    const onDragOver = (e: MouseEvent) => {
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

    inventoryItem?.addEventListener('drag', onDrag);
    inventoryItem?.addEventListener('drop', onDrop);
    inventoryItem?.addEventListener('dragover', onDragOver);

    return () => {
      inventoryItem?.removeEventListener('drag', onDrag);
      inventoryItem?.removeEventListener('drop', onDrop);
      inventoryItem?.removeEventListener('dragover', onDragOver);
    };
  }, [dragItem, item, order, setDragItem, swapItem]);

  return (
    <div className="relative flex items-center justify-center w-10 h-10 border rounded-lg" ref={ref} draggable>
      <div
        style={
          {
            order: order,
            width: ASSET_SIZE,
            height: ASSET_SIZE,
            backgroundImage: 'type' in item && item.type && 'url("/itemset.png")',
            backgroundPosition: position && `${position.x}px ${position.y}px`,
          } as React.CSSProperties
        }
      ></div>
      <div className="absolute bottom-0.5 right-0.5 text-white font-semibold">{item.quantity ? `x${item.quantity}` : ''}</div>
    </div>
  );
};

export default InventoryItem;
