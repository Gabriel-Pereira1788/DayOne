import type { StorageImpl } from "@/infra/adapters/storage";

export let storage: StorageImpl;

export function setStorage(storageImpl: StorageImpl) {
  storage = storageImpl;
}
