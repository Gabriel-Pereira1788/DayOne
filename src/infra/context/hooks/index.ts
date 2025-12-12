import {
  Context,
  useContext as useContextOrig,
  useSyncExternalStore,
} from "react";
import { CustomContext, Store } from "../types";

/**
 * Hook for accessing context values with selector-based subscriptions.
 *
 * This hook allows components to subscribe to only specific parts of the context value,
 * preventing unnecessary re-renders when unrelated parts of the context change.
 * Uses React 18's useSyncExternalStore for optimal performance and concurrent features support.
 *
 * @template T - The type of the full context value
 * @template R - The type of the selected value returned by the selector
 * @param {CustomContext<T>} context - The context created by createContext
 * @param {(value: T) => R} selector - Function that selects specific data from the context value
 * @returns {R} The selected value from the context
 *
 * @throws {Error} Throws an error if used outside of the corresponding Provider
 *
 * @example
 * ```tsx
 * // Only re-renders when user.name changes, not when settings change
 * const userName = useContextSelector(AppContext, (state) => state.user.name);
 *
 * // Only re-renders when settings.theme changes
 * const theme = useContextSelector(AppContext, (state) => state.settings.theme);
 * ```
 */
export const useContextSelector = <T, R>(
  context: CustomContext<T>,
  selector: (value: T) => R
): R => {
  const store = useContextOrig(context as unknown as Context<Store<T> | null>);

  if (!store) {
    throw new Error("useContextSelector must be used within a Provider");
  }

  return useSyncExternalStore(store.subscribe, () => selector(store.value));
};

/**
 * Hook for accessing the entire context value.
 *
 * This is a convenience hook that returns the full context value.
 * Equivalent to useContextSelector(context, (value) => value).
 * Use this when you need the entire context value or when selective subscriptions aren't needed.
 *
 * @template T - The type of the context value
 * @param {CustomContext<T>} context - The context created by createContext
 * @returns {T} The complete context value
 *
 * @throws {Error} Throws an error if used outside of the corresponding Provider
 *
 * @example
 * ```tsx
 * // Returns the entire context value - will re-render on any context change
 * const appState = useContext(AppContext);
 * ```
 */
export const useContext = <T>(context: CustomContext<T>): T => {
  return useContextSelector(context, (value) => value);
};
