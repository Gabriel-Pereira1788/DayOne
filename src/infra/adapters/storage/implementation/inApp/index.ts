import { StorageImpl } from "../../types";

const mockedStorage = new Map<string, string>();

async function setItem<T>(key: string, value: T): Promise<void> {
  mockedStorage.set(key, JSON.stringify(value));
}

async function getItem<T>(key: string): Promise<T | null> {
  const item = mockedStorage.get(key);
  return item ? (JSON.parse(item) as T) : null;
}

async function removeItem(key: string): Promise<void> {
  mockedStorage.delete(key);
}

async function clearAll(): Promise<void> {
  mockedStorage.clear();
}

function getItemSync<T>(key: string): T | null {
  const item = mockedStorage.get(key);
  return item ? (JSON.parse(item) as T) : null;
}

export const inAppStorage: StorageImpl = {
  getItem,
  getItemSync,
  setItem,
  clearAll,
  removeItem,
};
