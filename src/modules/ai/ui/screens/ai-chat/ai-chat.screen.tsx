import { Box, Text } from "@/shared/ui";
import { useAIChatController } from "./ai-chat.controller";
import { ProgressiveBlurView } from "@sbaiahmed1/react-native-blur";
import { withContextProvider } from "@/infra/context";
import { AIScreenProvider } from "../../context";
import { AIChatMessages } from "../../components/ai-chat-messages";
import { StyleSheet } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { ProgressBar } from "@/shared/ui/ProgressBar";
import { AIChatFooterSection } from "./components/ai-chat-footer-section";

function AiChatScreen() {
  const controller = useAIChatController();

  if (!controller.isReady) {
    return (
      <Box flex={1} alignItems="center" justifyContent="center" px="sp20">
        <Box width="100%" mb="sp10" gap="sp10">
          <Text
            preset="medium/14"
            text={`Download IA Model... ${Math.round(controller.downloadProgress * 100)}%`}
          />

          <ProgressBar progress={controller.downloadProgress} />
        </Box>
      </Box>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
      behavior="padding"
      keyboardVerticalOffset={-10}
    >
      <Box flex={1} alignItems="center" justifyContent="center" width={"100%"}>
        <Box width={"100%"} position="absolute" top={0} zIndex={100}>
          <ProgressiveBlurView
            blurType="dark"
            blurAmount={1.5}
            startOffset={0.1}
            direction="blurredTopClearBottom"
            style={styles.blurContainer}
          />
        </Box>
        <Box flex={1} width={"100%"} px="sp10" pt="sp10">
          <AIChatMessages isGenerating={controller.isGenerating} />
        </Box>
        <AIChatFooterSection onSend={controller.handleSendMessage} />
      </Box>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    height: 100,
    paddingBottom: 40,
  },
});

export default withContextProvider(AiChatScreen, AIScreenProvider);
