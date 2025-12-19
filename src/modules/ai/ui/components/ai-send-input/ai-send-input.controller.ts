import type { AISendInputProps } from "./types";
import type { TextInput } from "react-native";

import { useRef } from "react";
import { useAIScreenContext } from "../../context";
import { useMessageListActions } from "../../hooks/useMessageListRef";

interface Props extends AISendInputProps {}

export function useAISendInputController({ onSend }: Props) {
  // const showBackToEnd = useAIScreenContext((ctx) => ctx.state.showBackToEnd);
  const { scrollToEnd } = useMessageListActions();

  const inputRef = useRef<TextInput>(null);
  const value = useRef("");

  function handleSend() {
    // if (showBackToEnd) {
    //   scrollToEnd();
    //   return;
    // }

    if (value.current.trim() === "") {
      return;
    }

    onSend(value.current);
    value.current = "";
    inputRef.current?.clear();
    scrollToEnd();
  }

  function onInputPress() {
    inputRef.current?.focus();
    scrollToEnd();
  }

  function onChangeText(text: string) {
    value.current = text;
  }

  return {
    handleSend,
    onInputPress,
    showBackToEnd:false,
    inputRef,
    onChangeText,
  };
}
