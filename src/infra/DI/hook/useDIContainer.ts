import React, { useImperativeHandle, useMemo, useRef } from "react";
import { DIContainer } from "../di-container";

interface Props {
  config: (container: DIContainer) => void;
}

export const DIContainerRef = React.createRef<DIContainer | null>();

export function useDIContainer({ config }: Props) {
  const containerRef = useRef<DIContainer | null>(null);

  const container = useMemo(() => {
    if (!containerRef.current) {
      containerRef.current = new DIContainer();
      config(containerRef.current);
    }
    return containerRef.current;
  }, []);

  useImperativeHandle(DIContainerRef, () => container);

  return container;
}
