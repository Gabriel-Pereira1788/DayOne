import type { LLMServiceImpl } from "@/infra/adapters/llm/types";
import { createContext, useContext } from "react";

export type LLMContextProps = {
  llmService: LLMServiceImpl;
};

const LLMContext = createContext({} as LLMContextProps);

export function LLMProvider({
  llmService,
  children,
}: React.PropsWithChildren<{
  llmService: LLMServiceImpl;
}>) {
  return (
    <LLMContext.Provider value={{ llmService }}>{children}</LLMContext.Provider>
  );
}

export function useLLM() {
  const context = useContext(LLMContext);

  if (!context) {
    throw new Error("useRepository must be used within a RepositoryProvider");
  }

  return context.llmService;
}
