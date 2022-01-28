export interface ABIStorage {
  [key: number]: {
    [key: string]: string;
  };
}

const STORAGE_KEY = 'abi_storage';

export const getABIStorage = (): ABIStorage =>
  JSON.parse(
    localStorage.getItem(STORAGE_KEY) === null
      ? '{}'
      : (localStorage.getItem(STORAGE_KEY) as string),
  );

export const setABIStorage = (v: ABIStorage) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(v));
