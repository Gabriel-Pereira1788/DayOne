import { useState } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import Animated from "react-native-reanimated";
import { Box, BoxProps } from "../Box";

const TouchableAnimated = Animated.createAnimatedComponent(TouchableOpacity);

export interface TouchableBounceProps extends TouchableOpacityProps {
  boxProps?: BoxProps;
}

export function TouchableBounce({
  children,
  boxProps,
  ...touchableProps
}: React.PropsWithChildren<TouchableBounceProps>) {
  const [pressed, setPressed] = useState(false);
  return (
    <TouchableAnimated
      activeOpacity={1}
      style={{
        transitionDuration: 100,
        transitionTimingFunction: "ease-in",
        transitionProperty: "transform",
        transform: [{ scale: pressed ? 0.98 : 1 }],
      }}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      {...touchableProps}
    >
      <Box {...boxProps}>{children}</Box>
    </TouchableAnimated>
  );
}
