import { Box } from "@/shared/ui/Box/Box";
import { BoxGradient } from "@/shared/ui/Box/BoxGradient";
import { useAppSafeArea } from "@/shared/helpers";
import { Theme } from "@/styles";
import { GradientContainer } from "./GradientContainer";

export type PageProps = {
  gradientEnabled?: boolean;
  backgroundColor?: keyof Theme["colors"];
  disablePadding?: {
    top?: boolean;
    bottom?: boolean;
    horizontal?: boolean;
  };
};

export function Page({
  children,
  backgroundColor,
  gradientEnabled = false,
  disablePadding,
}: React.PropsWithChildren<PageProps>) {
  const { top, bottom } = useAppSafeArea();

  if (gradientEnabled && !backgroundColor) {
    return (
      <GradientContainer disablePadding={disablePadding}>
        {children}
      </GradientContainer>
    );
  }
  return (
    <Box
      flex={1}
      paddingHorizontal={!disablePadding?.horizontal ? "sp20" : undefined}
      style={{
        paddingTop: !disablePadding?.top ? top : undefined,
        paddingBottom: !disablePadding?.bottom ? bottom : undefined,
      }}
      backgroundColor={backgroundColor || "backgroundPrimary"}
    >
      {children}
    </Box>
  );
}
