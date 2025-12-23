import { useState } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import Animated from "react-native-reanimated";
import { Box, BoxProps } from "../Box";

const TouchableAnimated = Animated.createAnimatedComponent(TouchableOpacity);

export interface TouchableBounceProps extends React.ComponentProps<
  typeof TouchableAnimated
> {
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
      key={touchableProps.key}
      style={{
        width: boxProps?.width,
        borderCurve: "continuous",
        boxShadow: "0 5px 10px rgba(0,0,0,0.2)",
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
