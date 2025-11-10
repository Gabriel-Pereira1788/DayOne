import type { StorageImpl } from "@/infra/adapters/storage";
import { createContext, useContext, useEffect } from "react";
import { setStorage } from "../storage.service";

type StorageContextProps = {
  storage: StorageImpl;
};

const StorageContext = createContext({} as StorageContextProps);

export function StorageProvider({
  storage,
  children,
}: React.PropsWithChildren<StorageContextProps>) {
  useEffect(() => {
    setStorage(storage);
  }, []);
  return (
    <StorageContext.Provider value={{ storage }}>
      {children}
    </StorageContext.Provider>
  );
}

export function useStorage() {
  const context = useContext(StorageContext);
  if (!context)
    throw new Error("useStorage must be used within a StorageProvider");
  return context.storage;
}
