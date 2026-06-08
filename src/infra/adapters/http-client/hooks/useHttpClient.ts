import { useDI } from "@/infra/DI/context/DIContext";
import { DIKeys } from "@/infra/DI/types";

export function useHttpClient() {
  return useDI(DIKeys.HttpClient);
}
