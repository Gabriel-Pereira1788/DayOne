import { useDI } from "@/infra/DI/context";
import { DIKeys } from "@/infra/DI/types";

export function useStorage() {
  return useDI(DIKeys.Storage);
}
