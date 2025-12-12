import type { Context, ReactNode } from "react";

export interface Store<T> {
  value: T;
  subscribe: (listener: () => void) => () => void;
  notify: () => void;
}

export interface ProviderProps<T> {
  value: T;
  children: ReactNode;
}

export interface CustomContext<T> {
  Provider: (props: ProviderProps<T>) => React.JSX.Element;
  Consumer: Context<Store<T>>["Consumer"];
  displayName?: string;
}
