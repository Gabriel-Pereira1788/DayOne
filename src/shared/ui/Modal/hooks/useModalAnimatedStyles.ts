import {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { CLOSE_THRESHOLD } from "../constants";

type Props = {
  translateY: SharedValue<number>;
};
export function useModalAnimatedStyles({ translateY }: Props) {
  const bottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const backdropStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0, CLOSE_THRESHOLD],
      [0.6, 0],
      Extrapolation.CLAMP,
    );

    return {
      backgroundColor: `rgba(0, 0, 0, ${opacity})`,
    };
  });

  return { bottomSheetStyle,backdropStyle };
}
