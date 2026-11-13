import { useCallback, useState } from 'react';
import { readStorage, writeStorage } from '../utils/storage.js';

/**
 * React hook backed by localStorage with safe JSON serialization and functional updates.
 */
export function useLocalStorage(key, defaultValue) {
  const [storedValue, setStoredValue] = useState(() =>
    readStorage(key, defaultValue)
  );

  const setValue = useCallback(
    (valueOrUpdater) => {
      setStoredValue((prev) => {
        const nextValue =
          typeof valueOrUpdater === 'function'
            ? valueOrUpdater(prev)
            : valueOrUpdater;
        writeStorage(key, nextValue);
        return nextValue;
      });
    },
    [key]
  );

  return [storedValue, setValue];
}

