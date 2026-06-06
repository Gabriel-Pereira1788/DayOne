import { Box, Icon } from "@/shared/ui";
import { Pressable, TextInput, View } from "react-native";

import { AISendInputProps } from "./types";
import { useAISendInputController } from "./ai-send-input.controller";

export function AISendInput({ onSend }: AISendInputProps) {
  const { showBackToEnd, inputRef, handleSend, onChangeText, onInputPress } =
    useAISendInputController({
      onSend,
    });

  return (
    <View
      style={{
        gap: 10,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",

        justifyContent: "center",
      }}
    >
      <Pressable
        onPress={onInputPress}
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            borderRadius: 20,
            width: "100%",
          }}
        >
          <Box
            height={50}
            width={"100%"}
            paddingHorizontal="sp15"
            justifyContent="center"
          >
            <TextInput
              pointerEvents="none"
              ref={inputRef}
              placeholder="Type something"
              placeholderTextColor={"#ddd"}
              onChangeText={onChangeText}
              style={{
                color: "#fff",
              }}
            />
          </Box>
        </View>
      </Pressable>

      <Pressable onPress={handleSend} testID="send-button">
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon
            iconName={showBackToEnd ? "arrowDown" : "paperPlaneRight"}
            size={25}
          />
        </View>
      </Pressable>
    </View>
  );
}
