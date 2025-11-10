import type { TextStyle } from "react-native";

import { $fontSize, $fontWeight } from "../textConstants";
import { TextProps } from "../textTypes";

export function makePresetFont(preset: TextProps["preset"]): TextStyle | null {
  switch (preset) {
    case "light/14":
      return {
        fontSize: $fontSize.small14,
        fontWeight: $fontWeight.light,
      };
    case "medium/10":
      return {
        fontSize: $fontSize.small10,
        fontWeight: $fontWeight.medium,
      };
    case "medium/14":
      return {
        fontSize: $fontSize.small14,
        fontWeight: $fontWeight.medium,
      };
    case "medium/16":
      return {
        fontSize: $fontSize.medium16,
        fontWeight: $fontWeight.medium,
      };
    case "medium/20":
      return {
        fontSize: $fontSize.medium20,
        fontWeight: $fontWeight.medium,
      };
    case "medium/30":
      return {
        fontSize: $fontSize.big30,
        fontWeight: $fontWeight.medium,
      };
    case "semiBold/16":
      return {
        fontSize: $fontSize.medium16,
        fontWeight: $fontWeight.semiBold,
      };
    case "regular/10":
      return {
        fontSize: $fontSize.small10,
        fontWeight: $fontWeight.regular,
      };
    case "regular/14":
      return {
        fontSize: $fontSize.small14,
        fontWeight: $fontWeight.regular,
      };
    case "regular/16":
      return {
        fontSize: $fontSize.medium16,
        fontWeight: $fontWeight.regular,
      };
    case "semiBold/14":
      return {
        fontSize: $fontSize.small14,
        fontWeight: $fontWeight.semiBold,
      };
    case "semiBold/24":
      return {
        fontSize: $fontSize.medium24,
        fontWeight: $fontWeight.semiBold,
      };
    case "semiBold/32":
      return {
        fontSize: $fontSize.big32,
        fontWeight: $fontWeight.semiBold,
      };
    case "semiBold/48":
      return {
        fontSize: $fontSize.big48,
        fontWeight: $fontWeight.semiBold,
      };
    case "bold/30":
      return {
        fontSize: $fontSize.big30,
        fontWeight: $fontWeight.bold,
      };
    case "bold/40":
      return {
        fontSize: $fontSize.big40,
        fontWeight: $fontWeight.bold,
      };
    default:
      return null;
  }
}
