import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { TimeItemProps } from "./types";
import { useMemo } from "react";
import { Text } from "../Text/Text";
const ITEM_HEIGHT = 60;

export function TimeItem({ index, scrollY, value }: TimeItemProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const position = index * ITEM_HEIGHT;
    const currentDistance = Math.abs(scrollY.value - position) / ITEM_HEIGHT;

    const opacity = interpolate(currentDistance, [0, 1, 2], [1, 0.4, 0.2]);

    const scale = interpolate(currentDistance, [0, 1, 2], [1.5, 0.9, 0.8]);

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  const formattedValue = useMemo(
    () => value.toString().padStart(2, "0"),
    [value],
  );
  return (
    <Animated.View style={animatedStyle}>
      <Text text={formattedValue} preset={"medium/20"} color={"textPrimary"} />
    </Animated.View>
  );
}
