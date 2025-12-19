import { createContext, useContextSelector } from "@/infra/context";
import { AIScreenContextStateType } from "./types";
import { useReducer } from "react";
import { reducer } from "./reducer";

const AIScreenContext = createContext({} as AIScreenContextStateType);

export function AIScreenProvider({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, {
    messages: [],
    showBackToEnd: false,
    currentToken: "",
    streamingMessage: "",
    currentAIMessage: null,
  });
  return (
    <AIScreenContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AIScreenContext.Provider>
  );
}

export function useAIScreenContext<T>(
  selector: (ctx: AIScreenContextStateType) => T,
) {
  return useContextSelector(AIScreenContext, selector);
}
