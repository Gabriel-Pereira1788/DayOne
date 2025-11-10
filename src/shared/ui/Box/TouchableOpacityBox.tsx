import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

import {Box, BoxProps} from '../Box/Box';

export interface ITouchableOpacityBoxProps extends TouchableOpacityProps {
  children?: React.ReactNode;
  boxProps?: BoxProps;
}

export function TouchableOpacityBox({
  children,
  boxProps,

  ...rest
}: ITouchableOpacityBoxProps) {
  return (
    <TouchableOpacity {...rest} style={{width: boxProps?.width}}>
      <Box {...boxProps}>{children && children}</Box>
    </TouchableOpacity>
  );
}
