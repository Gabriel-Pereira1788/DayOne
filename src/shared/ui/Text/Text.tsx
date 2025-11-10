import React from 'react';
import { Text as TextRN } from 'react-native';

import { theme } from '@/styles';

import { makePresetFont } from './functions/makePresetFont';
import { $fontSize, $fontWeight } from './textConstants';
import { TextProps, FontStyleProps } from './textTypes';

export function Text({
  text,
  testID,
  preset,
  color = 'textPrimary',
  align = 'auto',
  children,
  letterSpacing,
  lineHeight,
  setColorsTheme,
  numberOfLines,
  ...rest
}: TextProps) {
  const _color = theme.colors[setColorsTheme?.light ?? color];

  if (preset) {
    const style = makePresetFont(preset);
    return (
      <TextRN
        testID={testID}
        numberOfLines={numberOfLines}
        style={{
          ...style,
          textAlign: align,
          letterSpacing,
          lineHeight,
          color: _color,
        }}>
        {text}
        {children}
      </TextRN>
    );
  }

  const { size = 'medium16', weight = 'medium' } = rest as FontStyleProps;

  const fontSize = $fontSize[size];
  const fontWeight = $fontWeight[weight];

  return (
    <TextRN
      testID={testID}
      style={{ fontSize: fontSize, color: _color, fontWeight: fontWeight }}
      numberOfLines={numberOfLines}>
      {text} {children}
    </TextRN>
  );
}
