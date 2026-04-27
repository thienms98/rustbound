import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import AudioPlay from '../AudioPlay';
import Inventory from './Inventory';
import { useKeyboard } from '@/store';

const Panel = () => {
  const [panel, setPanel] = useState(false);
  const [tab, setTab] = useState(0);
  const keys = useKeyboard.getState().keys;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (keys.has('b') || keys.has('tab')) {
        e.preventDefault();
        setPanel((prev) => !prev);
      }

      if (['escape'].includes(e.key.toLowerCase())) {
        setPanel(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <div
      className={cn(
        'fixed top-0 left-0 w-screen h-screen flex flex-col gap-8 bg-white/50 backdrop-blur-xl px-20 py-12 rounded-lg text-black text-sm select-none',
        panel ? '' : 'hidden',
      )}
      style={{
        top: 0,
        left: 0,
      }}
    >
      <div className="flex gap-6">
        <div className="p-4 rounded-lg bg-white" onClick={() => setTab(0)}>
          Inventory
        </div>
        <div className="p-4 rounded-lg bg-white" onClick={() => setTab(1)}>
          Character
        </div>
        <div className="p-4 rounded-lg bg-white" onClick={() => setTab(2)}>
          Stats
        </div>
        <div className="p-4 rounded-lg bg-white" onClick={() => setTab(3)}>
          Settings
        </div>
      </div>

      <Inventory className={tab === 0 ? '' : 'hidden'} />

      {panel && <AudioPlay />}
    </div>
  );
};

export default Panel;
