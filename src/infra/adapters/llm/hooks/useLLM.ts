import { useDI } from "@/infra/DI/context";
import { DIKeys } from "@/infra/DI/types";

export function useLLM() {
  return useDI(DIKeys.LLMService);
}
