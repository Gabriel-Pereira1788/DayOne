import { Box, Text } from "@/shared/ui";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useAIScreenContext } from "../../context";

import { AIMessageDataRender } from "../ai-message-data-render";

export function AICurrentMessage() {
  const currentAIMessage = useAIScreenContext(
    (ctx) => ctx.state.currentAIMessage,
  );

  if (!currentAIMessage) return null;

  const habitData = currentAIMessage.data
    ? Array.isArray(currentAIMessage.data)
      ? currentAIMessage.data
      : [currentAIMessage.data]
    : undefined;

  if (habitData) {
    return <AIMessageDataRender habitData={habitData} />;
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
