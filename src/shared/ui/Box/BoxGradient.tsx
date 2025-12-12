import { Theme } from "@/styles";
import { Box, BoxProps } from "./Box";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/shared/helpers/hooks";
import { buildGradientColors } from "./library/buildGradientColors";
import { ViewStyle } from "react-native";

export type KeyColors = keyof Theme["colors"];

export type BoxGradientProps = {
  colors: [KeyColors, KeyColors, ...KeyColors[]];
  startPoint?: { x: number; y: number };
  endPoint?: { x: number; y: number };
  style?: ViewStyle;
} & BoxProps;

export function BoxGradient({
  colors,
  startPoint,
  endPoint,
  style,
  children,

  ...boxProps
}: BoxGradientProps & React.PropsWithChildren) {
  const theme = useTheme();

  const gradientColors = buildGradientColors(colors, theme);
  const radius = boxProps.borderRadius
    ? theme.borderRadii[boxProps.borderRadius]
    : undefined;
  return (
    <LinearGradient
      colors={gradientColors}
      start={startPoint}
      end={endPoint}
      style={{
        borderRadius: radius,
        width: "100%",
        flex: boxProps.flex,
        paddingTop: style?.paddingTop,
        paddingBottom: style?.paddingBottom,
      }}
    >
      <Box
        overflow="hidden"
        {...boxProps}
        style={{ position: "relative" }}
        width="100%"
      >
        {children}
      </Box>
    </LinearGradient>
  );
}
