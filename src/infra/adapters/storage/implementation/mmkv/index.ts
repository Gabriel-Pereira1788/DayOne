import { MMKV } from "react-native-mmkv";
import { StorageImpl, StorageKeys } from "../../types";

const mmkv = new MMKV();
function setItem<T>(key?: StorageKeys, value?: T) {
  mmkv.set(key!, JSON.stringify(value!));
}

async function getItem<T>(key?: StorageKeys) {
  const data = mmkv.getString(key!) as string;
  if (!data) {
    return null;
  }
  const result = data ? ((await JSON.parse(data)) as T) : data;
  return result as T;
}

function removeItem(key?: StorageKeys) {
  mmkv.delete(key!);
}

function clearAll() {
  mmkv.clearAll();
}

export const mmkvImpl: StorageImpl = {
  setItem,
  getItem,
  removeItem,
  clearAll,
};
