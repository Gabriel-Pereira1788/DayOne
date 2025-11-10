import { IBaseRepositoryBuilder } from "@/infra/repository";
import React, { use, useEffect } from "react";
import { setRepositoryService } from "../repository.service";

export interface RepositoryContextType {
  repository: IBaseRepositoryBuilder;
}
const RepositoryContext = React.createContext<RepositoryContextType>(
  {} as RepositoryContextType,
);

export interface RepositoryProviderProps {
  local: IBaseRepositoryBuilder;
}

export function RepositoryProvider({
  children,
  local,
}: React.PropsWithChildren<RepositoryProviderProps>) {
  useEffect(() => {
    setRepositoryService(local);
  }, []);
  return (
    <RepositoryContext.Provider value={{ repository: local }}>
      {children}
    </RepositoryContext.Provider>
  );
}

export function useRepository() {
  const { repository } = React.useContext(RepositoryContext);
  if (!repository) {
    throw new Error("RepositoryProvider is missing");
  }

  return repository;
}
