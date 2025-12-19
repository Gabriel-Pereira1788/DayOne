import { createContext, useContext, useEffect, useMemo, useRef } from "react";
import { DIKeys, DIValues } from "../types";
import { DIContainer } from "../di-container";
import { useDIContainer } from "../hook/useDIContainer";

export const DIContext = createContext<DIContainer>({} as DIContainer);

interface DIProviderProps {
  config: (container: DIContainer) => void;
}

export function DIProvider({
  config,
  children,
}: React.PropsWithChildren<DIProviderProps>) {
  const container = useDIContainer({
    config,
  });

  return <DIContext.Provider value={container}>{children}</DIContext.Provider>;
}

export function useDI<Key extends DIKeys>(key: Key): DIValues[Key] {
  const container = useContext(DIContext);
  if (!container) {
    throw new Error("useDI must be used within a DIProvider");
  }
  return container.getService(key);
}
