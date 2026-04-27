import { useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import AudioPlay from '../AudioPlay';
import Inventory from './Inventory';
import Store from './Store';
import Settings from './Settings';
import { useKeyboard } from '@/store';

const TABS = [
  { id: 0, label: 'Inventory' },
  { id: 1, label: 'Store' },
  { id: 2, label: 'Stats' },
  { id: 3, label: 'Settings' },
] as const;

type TabId = (typeof TABS)[number]['id'];

const Panel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>(0);
  const keys = useKeyboard.getState().keys;

  const togglePanel = useCallback(() => setIsOpen((prev) => !prev), []);
  const closePanel = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (keys.has('b') || keys.has('tab')) {
        e.preventDefault();
        togglePanel();
      }

      if (e.key.toLowerCase() === 'escape') {
        closePanel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keys, togglePanel, closePanel]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <Inventory className="col-span-6" />;
      case 1:
        return (
          <>
            <Inventory className="col-span-6" />
            <Store className="col-span-6" />
          </>
        );
      case 2:
        return <div className="col-span-6">Stats panel coming soon</div>;
      case 3:
        return <Settings />;
      default:
        return null;
    }
  };

  return (
    <div className={cn('fixed inset-0 flex flex-col gap-8 bg-white/50 backdrop-blur-xl px-20 py-12 text-black text-sm select-none', isOpen ? '' : 'hidden')}>
      <div className="flex gap-6">
        {TABS.map((tab) => (
          <div key={tab.id} className={cn('p-4 rounded-lg bg-white cursor-pointer', activeTab === tab.id && 'ring-2 ring-blue-500')} onClick={() => setActiveTab(tab.id)}>
            {tab.label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-14">{renderTabContent()}</div>

      {isOpen && <AudioPlay />}
    </div>
  );
};

export default Panel;
