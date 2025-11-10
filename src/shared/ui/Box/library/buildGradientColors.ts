import {Theme} from '@/styles';
import {KeyColors} from '../BoxGradient';

export function buildGradientColors(
  colors: [KeyColors, KeyColors, ...KeyColors[]],
  theme: Theme,
) {
  const gradientColors: [string, string, ...string[]] = [];
  for (let color of colors) {
    const hexColor = theme.colors[color];

    gradientColors.push(hexColor);
  }

  return gradientColors;
}
