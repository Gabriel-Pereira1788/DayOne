import {
  createContext as createContextOrig,
  useRef,
  useEffect,
  ReactNode,
} from "react";
import { CustomContext, ProviderProps, Store } from "./types";

/**
 * Creates a React context with selector support and optimized re-rendering.
 *
 * This function enhances the standard React context by providing:
 * - Selector-based subscriptions to prevent unnecessary re-renders
 * - External store synchronization using React 18's useSyncExternalStore
 * - Automatic listener management and cleanup
 *
 * @template T - The type of the context value
 * @param {T} [defaultValue] - Optional default value for the context
 * @returns {CustomContext<T>} A custom context object with enhanced Provider and selector support
 *
 * @example
 * ```tsx
 * interface AppState {
 *   user: { name: string };
 *   settings: { theme: string };
 * }
 *
 * const AppContext = createContext<AppState>();
 *
 * function App() {
 *   const [state, setState] = useState<AppState>({
 *     user: { name: 'John' },
 *     settings: { theme: 'dark' }
 *   });
 *
 *   return (
 *     <AppContext.Provider value={state}>
 *       <UserComponent />
 *     </AppContext.Provider>
 *   );
 * }
 * ```
 */
export const createContext = <T,>(defaultValue?: T): CustomContext<T> => {
  const context = createContextOrig<Store<T> | null>(null);
  const ProviderOrig = context.Provider;

  /**
   * Enhanced Provider component that manages subscriptions and notifications.
   *
   * This Provider creates and manages a store with listener subscription capabilities,
   * automatically notifying subscribed components when the value changes.
   *
   * @param {ProviderProps<T>} props - Provider props containing value and children
   * @param {T} props.value - The context value to provide to consumers
   * @param {ReactNode} props.children - Child components that will have access to the context
   * @returns {JSX.Element} Provider component wrapping children with context store
   */
  const Provider = ({ value, children }: ProviderProps<T>) => {
    const storeRef = useRef<Store<T> | null>(null);

    // Initialize store only once to maintain reference stability
    if (!storeRef.current) {
      const listeners = new Set<() => void>();

      const store: Store<T> = {
        value: value,
        /**
         * Subscribes a listener function to store changes.
         * @param {() => void} listener - Function to call when store value changes
         * @returns {() => void} Unsubscribe function to remove the listener
         */
        subscribe: (listener: () => void) => {
          listeners.add(listener);
          return () => listeners.delete(listener);
        },
        /**
         * Notifies all subscribed listeners of a store value change.
         */
        notify: () => listeners.forEach((listener) => listener()),
      };

      storeRef.current = store;
    }

    const store = storeRef.current;

    // Update store value and notify listeners when value prop changes
    useEffect(() => {
      if (!Object.is(store.value, value)) {
        store.value = value;
        store.notify();
      }
    }, [value, store]);

    return <ProviderOrig value={store}>{children}</ProviderOrig>;
  };

  //@ts-ignore
  context.Provider = Provider;

  return context as unknown as CustomContext<T>;
};

/**
 * Higher-order component that wraps a component with a context provider.
 *
 * This utility function creates a new component that automatically wraps the provided
 * component with the specified Provider. Useful for creating pre-configured components
 * or for component composition patterns.
 *
 * @template P - The props type of the component to be wrapped
 * @param {React.ComponentType<P>} Component - The component to wrap with the provider
 * @param {React.ComponentType<{ children: ReactNode }>} Provider - The provider component to wrap with
 * @returns {(props: P) => JSX.Element} A new component that renders the original component wrapped in the provider
 *
 * @example
 * ```tsx
 * const UserProfile = ({ userId }: { userId: string }) => {
 *   const user = useContextSelector(UserContext, (state) => state.user);
 *   return <div>{user.name}</div>;
 * };
 *
 * // Create a version of UserProfile that's automatically wrapped with UserProvider
 * const UserProfileWithProvider = withContextProvider(
 *   UserProfile,
 *   ({ children }) => <UserContext.Provider value={userData}>{children}</UserContext.Provider>
 * );
 *
 * // Usage: no need to manually wrap with provider
 * <UserProfileWithProvider userId="123" />
 * ```
 */
export function withContextProvider<P extends object>(
  Component: React.ComponentType<P>,
  Provider: React.ComponentType<{ children: ReactNode }>
) {
  return (props: P) => (
    <Provider>
      <Component {...props} />
    </Provider>
  );
}
