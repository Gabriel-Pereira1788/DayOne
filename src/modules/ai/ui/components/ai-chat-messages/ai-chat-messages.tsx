import {
  FlatList,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { useAIScreenContext } from "../../context";
import { Box } from "@/shared/ui";
import { useCallback, useEffect } from "react";
import { AIChatMessageProps } from "./types";
import { Message } from "@/infra/adapters/llm/types";
import { AIChatTypingIndicator } from "../ai-chat-typing-indicator/ai-chat-typing-indicator";
import { MessageBubble } from "../message-bubble";
import { useMessagesListRef } from "../../hooks/useMessageListRef";
import { AIChatMessageTokenized } from "../ai-chat-message-tokenized/ai-chat-message-tokenized";

export function AIChatMessages({ isGenerating }: AIChatMessageProps) {
  const messages = useAIScreenContext((ctx) => ctx.state.messages);
  const aiChatDispatch = useAIScreenContext((ctx) => ctx.dispatch);

  const messageListRef = useMessagesListRef();

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const scrollY = event.nativeEvent.contentOffset.y;
      const contentSizeY = event.nativeEvent.contentSize.height;

      if (scrollY < contentSizeY / 3 - 300) {
        aiChatDispatch({
          type: "SET_SHOW_BACK_TO_END",
          payload: true,
        });
      } else {
        aiChatDispatch({
          type: "SET_SHOW_BACK_TO_END",
          payload: false,
        });
      }
    },
    [],
  );

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        messageListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages.length]);

  const renderMessage: ListRenderItem<Message> = useCallback(({ item }) => {
    if (item.role === "typing") {
      return <AIChatTypingIndicator />;
    }
    return <MessageBubble message={item as Message} />;
  }, []);

  return (
    <FlatList
      ref={messageListRef}
      onScroll={onScroll}
      data={messages}
      renderItem={renderMessage}
      keyExtractor={(item) => `${item.id}-${item.role}`}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1, paddingTop: 50, paddingBottom: 60 }}
      ListFooterComponent={() =>
        isGenerating ? (
          <>
            <AIChatMessageTokenized />
            <Box height={20} />
          </>
        ) : (
          <Box height={20} />
        )
      }
      keyboardShouldPersistTaps="handled"
    />
  );
}
