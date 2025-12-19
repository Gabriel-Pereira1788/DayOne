import { useDI } from "@/infra/DI/context";
import { DIKeys } from "@/infra/DI/types";

export function useRepository() {
  return useDI(DIKeys.Repository);
}
