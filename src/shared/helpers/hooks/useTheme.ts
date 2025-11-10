import { useTheme as useThemeRE } from "@shopify/restyle";
import { Theme } from "@/styles";

export function useTheme() {
  const theme = useThemeRE<Theme>();

  return { ...theme };
}
