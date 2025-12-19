import React, { useEffect, useState } from "react";
import { Text } from "@/shared/ui";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  useAnimatedReaction,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { TextProps } from "@/shared/ui/Text/textTypes";

interface AnimatedMessageTextProps extends Omit<TextProps, "text"> {
  text: string;
  speed?: number;
  enabled?: boolean;
  onComplete?: () => void;
  showCursor?: boolean;
}

const AnimatedTextComponent = Animated.createAnimatedComponent(Text);

export function AnimatedMessageText({
  text,
  speed = 25,
  enabled = true,
  onComplete,
  showCursor = false,
  ...textProps
}: AnimatedMessageTextProps) {
  const [displayedText, setDisplayedText] = useState("");

  const progress = useSharedValue(0);
  const cursorOpacity = useSharedValue(1);

  const updateText = (currentProgress: number) => {
    const charCount = Math.floor(currentProgress * text.length);
    const newText = text.slice(0, charCount);
    setDisplayedText(newText);

    if (charCount >= text.length) {
      onComplete?.();
    }
  };

  useAnimatedReaction(
    () => progress.value,
    (currentProgress) => {
      scheduleOnRN(updateText, currentProgress);
    },
  );

  useEffect(() => {
    if (!enabled || !text) {
      setDisplayedText(text);
      progress.value = 1;
      return;
    }

    setDisplayedText("");

    progress.value = 0;

    const duration = Math.min(text.length * speed, 10000); // Cap at 10 seconds

    progress.value = withTiming(1, {
      duration,
      easing: Easing.linear,
    });

    if (showCursor) {
      cursorOpacity.value = withTiming(
        0,
        {
          duration: 500,
          easing: Easing.inOut(Easing.ease),
        },
        () => {
          "worklet";
          cursorOpacity.value = withTiming(1, {
            duration: 500,
            easing: Easing.inOut(Easing.ease),
          });
        },
      );
    }
  }, [text, speed, enabled]);

  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(1, {
        duration: 300,
        easing: Easing.ease,
      }),
    };
  });

  return (
    <Animated.View style={textAnimatedStyle}>
      <Text {...textProps}>{displayedText}</Text>
    </Animated.View>
  );
}
