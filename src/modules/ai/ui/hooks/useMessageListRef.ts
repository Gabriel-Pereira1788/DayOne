import { dimensions } from "@/shared/helpers";
import React, { useRef } from "react";
import { FlatList } from "react-native";

const messageListRef = React.createRef<FlatList>();

export function useMessagesListRef() {
  return messageListRef;
}

export function useMessageListActions() {
  function scrollToIndex(index: number) {
    messageListRef.current?.scrollToIndex({ index });
  }

  function scrollToEnd() {
    messageListRef.current?.scrollToOffset({
      offset: dimensions.height + 100,
      animated: true,
    });
    // messageListRef.current?.scrollToEnd({ animated: true });
  }

  function scrollToTop() {
    messageListRef.current?.scrollToOffset({ offset: 0, animated: true });
  }

  return {
    scrollToEnd,
    scrollToTop,
    scrollToIndex,
  };
}
