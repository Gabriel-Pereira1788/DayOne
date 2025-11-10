import { Theme } from "@/styles";
import { BoxProps } from "../../Box/Box";
import { ButtonProps } from "../Button";

export function buildVariant(variant: ButtonProps["variant"]): {
  container: BoxProps;
  textColor: keyof Theme["colors"];
} {
  switch (variant) {
    case "filled":
      return {
        container: {
          backgroundColor: "buttonPrimaryBackground",
          height: 54,
          width: "100%",
        },
        textColor: "textPrimary",
      };

    case "transparent":
      return {
        container: {
          height: "auto",
          width: "auto",
        },
        textColor: "textSecondary",
      };
    default:
      return {
        container: {
          borderRadius: "rd30",
          borderColor: "surfaceBorder",
          borderWidth: 2,
          height: 54,
          width: "100%",
        },
        textColor: "textPrimary",
      };
  }
}
