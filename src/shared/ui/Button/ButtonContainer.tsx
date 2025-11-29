import { Box } from "../Box/Box";
import { BoxGradient } from "../Box/BoxGradient";

import { ButtonProps } from "./Button";
import { buildGradientVariant } from "./library/buildGradientVariant";
// import { BoxGradient } from "../Box";

type ButtonContainerProps = {
  rightIconName?: boolean;
  enableGradient?: boolean;
  variant: ButtonProps["variant"];
} & React.PropsWithChildren;
export function ButtonContainer({
  children,
  enableGradient = false,
  rightIconName,
  variant,
}: ButtonContainerProps) {
  if (enableGradient) {
    const colors = buildGradientVariant(variant);
    return (
      <BoxGradient
        colors={colors}
        flexDirection={rightIconName ? "row" : "column"}
        gap="sp10"
        width={"100%"}
        height={"100%"}
        alignItems="center"
        justifyContent="center"
        startPoint={{
          x: 0.3,
          y: 0.5,
        }}
        endPoint={{
          x: 0.9,
          y: 0.1,
        }}
      >
        {children}
      </BoxGradient>
    );
  }
  return (
    <Box flexDirection={rightIconName ? "row" : "column"} gap="sp10">
      {children}
    </Box>
  );
}
