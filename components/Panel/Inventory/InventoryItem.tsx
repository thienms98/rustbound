import { ASSET_SIZE, getResourceAssetPosition, splitSlot, type InventorySlot as InventoryItemType } from '@/lib/inventory';
import { cn } from '@/lib/utils';
import { useInventory } from '@/store';
import { MouseEventHandler, useMemo } from 'react';

interface Props {
  item: InventoryItemType;
  order: number;
  state: {
    dragItem?: number;
    setDragItem: React.Dispatch<React.SetStateAction<number | undefined>>;
    selectedItem?: string;
    setSelectedItem: React.Dispatch<React.SetStateAction<string | undefined>>;
  };
}

const InventoryItem = ({ state: { dragItem, setDragItem, selectedItem, setSelectedItem }, order, item }: Props) => {
  const swapItem = useInventory((state) => state.swapItem);
  const splitItem = useInventory((state) => state.splitItem);

  const position = useMemo(() => {
    return item ? getResourceAssetPosition(item.type) : null;
  }, [item]);

  const onClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    if (e.shiftKey) {
      splitItem(order);
    }

    setSelectedItem(item?.id);
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
    backgroundImage: item ? 'url("/itemset.png")' : 'none',
    backgroundPosition: position ? `${position.x}px ${position.y}px` : '0 0',
  };

  return (
    <div
      className={cn(
        'relative flex items-center justify-center size-16 border rounded-lg cursor-pointer',
        item && item.id === selectedItem ? 'border-blue-400 outline-3 outline-blue-400' : '',
      )}
      draggable={!!item}
      onClick={onClick}
      onDrag={onDrag}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      {item && <div style={itemStyle} />}

      {item && item.quantity > 1 ? <div className="absolute bottom-0.5 right-0.5 text-black font-semibold text-xs">x{item.quantity}</div> : null}
    </div>
  );
};

export default InventoryItem;
