import Animated, { FadeInDown } from "react-native-reanimated";
import { useAIScreenContext } from "../../context";
import { AIChatTypingIndicator } from "../ai-chat-typing-indicator";
import { Message } from "@/infra/adapters/llm/types";
import { useEffect, useMemo } from "react";
import { AnimatedMessageText } from "../message-bubble/components";

export function AIChatMessageTokenized() {
  const streamingMessage = useAIScreenContext(
    (ctx) => ctx.state.streamingMessage,
  );

  const visibleContent = useMemo(() => {
    if (!streamingMessage) return "";

    let processedContent = streamingMessage;

    const hasOpenThink =
      processedContent.includes("<think>") &&
      !processedContent.includes("</think>");
    if (hasOpenThink) {
      processedContent = processedContent.split("<think>")[0];
    }

    if (
      processedContent.includes("<think>") &&
      processedContent.includes("</think>")
    ) {
      processedContent = processedContent.replace(
        /<think>[\s\S]*?<\/think>/g,
        "",
      );
    }

    processedContent = processedContent.trim();

    const regex = /"message"\s*:\s*"((?:[^"\\]|\\.)*)",/s;
    const match = processedContent.match(regex);

    if (!match) return "";

    return match[1];
  }, [streamingMessage]);

  if (!visibleContent.trim()) {
    return (
      <Animated.View entering={FadeInDown}>
        <AIChatTypingIndicator />
      </Animated.View>
    );
  }

  const temporaryMessage: Message = {
    id: "streaming-message",
    role: "assistant",
    content: visibleContent,
  };

  return (
    <Animated.View entering={FadeInDown}>
      <AnimatedMessageText
        text={temporaryMessage.content}
        preset="regular/14"
        color="textSecondary"
        showCursor
        enabled
      />
    </Animated.View>
  );
}
