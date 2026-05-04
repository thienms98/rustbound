import { useKeyboard } from '@/store';
import { useEffect } from 'react';

const KeyController = () => {
  const keys = useKeyboard.getState().keys;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      keys.add(e.key.toLowerCase());
    };

    const onKeyUp = (e: KeyboardEvent) => {
      keys.delete(e.key.toLowerCase());
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  return null;
};

export default KeyController;
