import { ReactNode } from 'react';

import { Theme } from '@/styles';

import { FontSize, FontWeight } from './textConstants';

export interface FontStyleProps {
  size?: FontSize;
  weight?: FontWeight;
}

type Preset =
  | 'light/14'
  | 'medium/10'
  | 'medium/14'
  | 'medium/16'
  | 'medium/20'
  | 'medium/30'
  | 'semiBold/16'
  | 'regular/14'
  | 'regular/10'
  | 'regular/16'
  | 'semiBold/14'
  | 'semiBold/24'
  | 'semiBold/32'
  | 'semiBold/48'
  | 'bold/30'
  | 'bold/40'
  | undefined;

interface CommonTextProps<T> {
  testID?: string;
  text: string;
  align?: 'center' | 'right' | 'left' | 'auto' | 'justify';
  color?: keyof Theme['colors'];
  setColorsTheme?: {
    dark: keyof Theme['colors'];
    light: keyof Theme['colors'];
  };
  letterSpacing?: number;
  lineHeight?: number;
  preset?: T;
  children?: ReactNode;
  numberOfLines?: number;
}

export type TextProps<T = Preset> = T extends undefined
  ? FontStyleProps & CommonTextProps<T>
  : CommonTextProps<T>;
