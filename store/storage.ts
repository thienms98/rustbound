import { CROP } from '@/components/objects/Crop';
import { create } from 'zustand';

const initStorage: StorageStore['storage'] = {
  Carrot: {
    amount: 0,
    limit: 100,
  },
  Potatoe: {
    amount: 0,
    limit: 100,
  },
  Tomato: {
    amount: 0,
    limit: 100,
  },
  Wheat: {
    amount: 0,
    limit: 50,
  },
};

interface StorageStore {
  storage: {
    [key in CROP]: {
      amount: number;
      limit: number;
    };
  };
}

const useStorage = create<StorageStore>((set) => ({
  storage: initStorage,
}));
