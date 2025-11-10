import { BoxProps } from "@/shared/ui/Box/Box";
import { IconPressProps } from "../IconPress";

export function buildVariant(
  variant: IconPressProps["variant"],
  enableGradient?: boolean,
): BoxProps | undefined {
  switch (variant) {
    case "filled":
      return {
        backgroundColor: !enableGradient ? "backgroundSecondary" : undefined,
        borderRadius: "rd12",
        alignItems: "center",
        justifyContent: "center",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        shadowColor: "surfaceBorder",
        elevation: 2,
        width: 50,
        height: 50,
      };
    case "transparent":
      return undefined;
    case "rounded":
      return {
        backgroundColor: "backgroundSecondary",
        borderRadius: "rd100",
        alignItems: "center",
        justifyContent: "center",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        shadowColor: "surfaceBorder",
        elevation: 2,
        height: 50,
        width: 50,
      };
  }
}
