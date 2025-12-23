import type { AISendInputProps } from "./types";
import type { TextInput } from "react-native";

import { useRef } from "react";

interface Props extends AISendInputProps {}

export function useAISendInputController({ onSend }: Props) {
  const inputRef = useRef<TextInput>(null);
  const value = useRef("");

  function handleSend() {
    if (value.current.trim() === "") {
      return;
    }

    onSend(value.current);
    value.current = "";
    inputRef.current?.clear();
  }

  function onInputPress() {
    inputRef.current?.focus();
  }

  function onChangeText(text: string) {
    value.current = text;
  }

  return {
    handleSend,
    onInputPress,
    showBackToEnd: false,
    inputRef,
    onChangeText,
  };
}
