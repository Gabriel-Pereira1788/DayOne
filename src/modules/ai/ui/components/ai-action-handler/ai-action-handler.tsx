import { Box } from "@/shared/ui";
import { NitroOrb } from "react-native-nitro-orb";
import { AISendInput } from "../ai-send-input/ai-send-input";
import { withContextProvider } from "@/infra/context";
import { AIScreenProvider } from "../../context";
import { AIChatMessageTokenized } from "../ai-chat-message-tokenized/ai-chat-message-tokenized";
import { useAIActionHandlerController } from "./ai-action-handler.controller";
import { ProgressBar } from "@/shared/ui/ProgressBar";
import { AICurrentMessage } from "../ai-current-message/ai-current-message";

function AIActionHandler() {
  const controller = useAIActionHandlerController();

  if (!controller.isReady) {
    return (
      <Box flex={1} alignItems="center" justifyContent="center" px="sp20">
        <NitroOrb
          showParticles={true}
          size={150}
          speed={90}
          style={{
            width: 200,
            height: 200,
          }}
        />
        <Box width="100%" mb="sp10" gap="sp10">
          <ProgressBar progress={controller.downloadProgress} />
        </Box>
      </Box>
    );
  }

  return (
    <Box
      flex={1}
      alignItems="center"
      justifyContent="center"
      gap="sp25"
      paddingHorizontal="sp10"
      paddingBottom="sp10"
    >
      <NitroOrb
        showParticles={true}
        size={150}
        speed={controller.isGenerating ? 90 : 20}
        style={{
          width: 200,
          height: 120,
        }}
      />
      <Box mt="sp17" width={"100%"} alignItems="center">
        {controller.isGenerating ? (
          <AIChatMessageTokenized />
        ) : (
          <AICurrentMessage />
        )}
      </Box>

      <AISendInput onSend={controller.handleSendMessage} />
    </Box>
  );
}

export default withContextProvider(AIActionHandler, AIScreenProvider);
