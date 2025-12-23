import { Box, Text } from "@/shared/ui";
import Animated, { FadeInDown } from "react-native-reanimated";

import { AIMessageDataRender } from "../ai-message-data-render";
import { AICurrentMessageProps } from "./types";

export function AICurrentMessage({ currentAIMessage }: AICurrentMessageProps) {
  if (!currentAIMessage) return null;

  const habitData = currentAIMessage.data
    ? Array.isArray(currentAIMessage.data)
      ? currentAIMessage.data
      : [currentAIMessage.data]
    : undefined;

  if (habitData) {
    return (
      <AIMessageDataRender
        habitData={habitData}
        messageContent={currentAIMessage.content}
      />
    );
  }

  return (
    <Animated.View entering={FadeInDown}>
      <Text
        preset="regular/14"
        text={currentAIMessage.content}
        color="textSecondary"
      />
    </Animated.View>
  );
}
