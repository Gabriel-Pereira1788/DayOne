import React from 'react';

import {BoxProps} from '../Box';

import {BoxGradient} from '../Box/BoxGradient';
import {Theme} from '@/styles';

export type KeyColors = keyof Theme['colors'];
interface GradientCardProps extends BoxProps {
  gradientColors?: [KeyColors, KeyColors, ...KeyColors[]];
}
export function GradientCard({
  gradientColors,
  children,
  ...boxProps
}: React.PropsWithChildren<GradientCardProps>) {
  return (
    <BoxGradient
      colors={
        gradientColors ?? [
          'backgroundPrimary',
          'backgroundSecondary',
          'backgroundTertiary',
        ]
      }
      startPoint={{x: 0, y: 0}}
      endPoint={{x: 1, y: 1}}
      borderWidth={1}
      borderColor="surfaceBorder"
      borderRadius="rd15"
      p="sp20"
      {...boxProps}>
      {children}
    </BoxGradient>
  );
}
