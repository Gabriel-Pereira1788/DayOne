import { KeyColors } from "../../Box/BoxGradient";
import { ButtonProps } from "../Button";

export function buildGradientVariant(
  variant: ButtonProps["variant"],
): [KeyColors, KeyColors, ...KeyColors[]] {
  switch (variant) {
    case "elevated":
      return [
        "buttonElevatedBackgroundStart",
        "buttonElevatedBackgroundEnd",

      ];
    default:
      return [
        "backgroundPrimary",
        "buttonPrimaryBackground",
        "buttonSecondaryBackground",
        "buttonSecondaryHover",
      ];
  }
}
