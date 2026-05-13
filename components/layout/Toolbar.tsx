import { cn } from '@/lib/utils';
import { ActionType, useAction } from '@/store/action';
import { TOOLBAR_SLOTS, useInventory } from '@/store/inventory';
import { DragEventHandler, useEffect } from 'react';

const Toolbar = () => {
  const { hand, setHand } = useAction();
  console.log('🚀 ~ Toolbar ~ hand:', hand);
  const toolbar = useInventory((state) => state.toolbar);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {};
  }, []);

  const onDrag = () => {};

  const onDragOver: DragEventHandler = (e) => {
    e.preventDefault();
  };

  const onDrop = () => {};

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex gap-3 px-8 py-3 rounded-md bg-transparent backdrop-blur-2xl">
      {toolbar.map((item, index) => (
        <div
          key={item?.id || index}
          className={cn(
            'p-1 px-3 rounded-md text-black/50 bg-white/40 hover:bg-white transition-colors cursor-pointer',
            hand && item && hand.id === item.id ? 'bg-white' : '',
          )}
          onClick={() => {
            if (hand?.name !== item?.name) setHand(item);
          }}
          onDragOver={onDragOver}
          onDrop={onDrop}
        >
          {item?.name || ''} ({index})
        </div>
      ))}

      {/* {hand.type === ActionType.PLANT && <div className="absolute"></div>} */}
    </div>
  );
};

export default Toolbar;
