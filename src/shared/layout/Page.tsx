import { Box } from "@/shared/ui/Box/Box";
import { BoxGradient } from "@/shared/ui/Box/BoxGradient";
import { useAppSafeArea } from "@/shared/helpers";
import { Theme } from "@/styles";
import { GradientContainer } from "./GradientContainer";
import { Icon, IconPress } from "../ui/Icon";
import { router } from "expo-router";
import { ProgressiveBlurView } from "@sbaiahmed1/react-native-blur";

export type PageProps = {
  gradientEnabled?: boolean;
  goBack?: boolean;
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
  goBack,
  gradientEnabled = false,
  disablePadding,
}: React.PropsWithChildren<PageProps>) {
  const { top, bottom } = useAppSafeArea();
  console.log("BOTTOM:", bottom)

  if (gradientEnabled && !backgroundColor) {
    return (
      <GradientContainer disablePadding={disablePadding}>
        {goBack && (
          <Box width={"100%"} justifyContent="flex-start" mb="sp10">
            <IconPress
              testID="go-back"
              variant="transparent"
              size={50}
              iconName="caretLeft"
              onPress={router.back}
            />
          </Box>
        )}
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
      {goBack && (
        <Box width={"100%"} justifyContent="flex-start" mb="sp10">
          <IconPress
            testID="go-back"
            variant="transparent"
            size={40}
            iconName="caretLeft"
            onPress={router.back}
          />
        </Box>
      )}
      {children}
    </Box>
  );
}
