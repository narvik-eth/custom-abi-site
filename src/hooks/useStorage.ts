import { useState } from 'react';
import { getABIStorage, setABIStorage, ABIStorage } from '../storage';

export const useStorage = (): [ABIStorage, (v: ABIStorage) => void] => {
  const [storage, setStorage] = useState(getABIStorage());

  return [
    storage,
    (v: ABIStorage) => {
      setABIStorage(v);
      setStorage(v);
    },
  ];
};
