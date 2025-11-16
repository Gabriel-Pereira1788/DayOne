import { Theme } from "@/styles";
import { KeyColors } from "../BoxGradient";

type Gradient = [string, string, ...string[]];
export function buildGradientColors(
  colors: [KeyColors, KeyColors, ...KeyColors[]],
  theme: Theme,
) {
  const gradientColors: Gradient = [] as unknown as Gradient;
  for (let color of colors) {
    const hexColor = theme.colors[color];

    gradientColors.push(hexColor);
  }

  return gradientColors;
}
