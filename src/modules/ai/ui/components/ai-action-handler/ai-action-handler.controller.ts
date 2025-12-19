import { useLLMMessages } from "@/shared/services/llm";
import { useCallback, useState } from "react";
import { Keyboard } from "react-native";
import { useAIScreenContext } from "../../context";
import { AI_PROMPT } from "@/modules/ai/constants/prompt";
import { validateAIResponse } from "@/modules/ai/utils/validateAIResponse";
import { useExecuteAICommand } from "@/modules/ai/domain/useCases/execute-ai-command";

export function useAIActionHandlerController() {
  const aiChatDispatch = useAIScreenContext((ctx) => ctx.dispatch);
  const { execute } = useExecuteAICommand({});
  const [downloadProgress, setDownloadProgress] = useState(0);

  const { isGenerating, generate, isReady, error } = useLLMMessages({
    context: [],
    tools:[],
    systemPrompt: AI_PROMPT,
    onTokenCallback: (token) => {
      aiChatDispatch({
        type: "SET_CURRENT_TOKEN",
        payload: token,
      });
    },
    onDownloadProgress: (progress) => {
      setDownloadProgress(progress);
    },
  });

  const handleSendMessage = useCallback(
    async (text: string) => {
      if (!isReady || isGenerating) return;

      Keyboard.dismiss();

      aiChatDispatch({
        type: "ADD_USER_MESSAGE",
        payload: {
          content: text,
          role: "user",
        },
      });

      const response = await generate(text);
      if (!response) return;

      const command = validateAIResponse(response?.content);

      if (command) {
        const result = await execute(command);

        aiChatDispatch({
          type: "SET_CURRENT_AI_MESSAGE",
          payload: {
            content: command.message,
            role: response.role,
            data:
              command.type !== "DELETE_HABIT" && command.type.includes("HABIT")
                ? result.data
                : undefined,
          },
        });
      }
    },
    [isReady, isGenerating],
  );

  return {
    downloadProgress,
    handleSendMessage,
    isReady,
    isGenerating,
  };
}
