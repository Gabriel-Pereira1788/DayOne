export interface StorageImpl {
  setItem<T>(key?: string, value?: T): void;
  getItem<T>(key?: string): Promise<T | null>;
  removeItem(key?: string): void;
  clearAll(): void;
}

export enum StorageKeys {
  USER_TOKEN = "@user_token",
  SESSION = "@session",
}
