import { useAIScreenContext } from "../../context";
import { AIChatTypingIndicator } from "../ai-chat-typing-indicator";
import { MessageBubble } from "../message-bubble";
import { Message } from "@/infra/adapters/llm/types";
import { useEffect, useMemo } from "react";

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

  useEffect(() => {
    if (visibleContent.trim()) {
      console.log("Temporary message content:", temporaryMessage.content);
    }
  }, [visibleContent]);

  if (!visibleContent.trim()) {
    return <AIChatTypingIndicator />;
  }

  const temporaryMessage: Message = {
    id: "streaming-message",
    role: "assistant",
    content: visibleContent,
  };

  return <MessageBubble message={temporaryMessage} animated />;
}
