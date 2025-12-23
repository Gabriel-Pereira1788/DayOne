import { useLLMMessages } from "@/shared/services/llm";
import { useCallback, useRef, useState } from "react";
import { Keyboard } from "react-native";
import { AI_PROMPT } from "@/modules/ai/constants/prompt";
import { useExecuteAICommand } from "@/modules/ai/domain/useCases/execute-ai-command";
import { TOOL_DEFINITIONS } from "@/modules/ai/constants/tools";
import {
  validateCallTool,
  validateCallToolArguments,
} from "@/modules/ai/utils/validateCallTool";
import { AICommand, CommandType } from "@/modules/ai/domain/ai.model";
import { buildCommandMessage } from "@/modules/ai/utils/buildCommandMessage";
import { DEFAULT_AI_MESSAGE } from "@/modules/ai/constants/default";
import { Tool } from "@/infra/adapters/llm/types";

export function useAIActionHandlerController() {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [currentAIMessage, setCurrentAIMessage] = useState(DEFAULT_AI_MESSAGE);

  const textRef = useRef("");

  const { execute } = useExecuteAICommand({});

  const { isGenerating, isReady, sendMessage, interrupt } = useLLMMessages({
    tools: TOOL_DEFINITIONS,
    systemPrompt: AI_PROMPT,
    onExecuteToolCallback: async (call) => {
      if (!validateCallTool(call)) {
        console.error(`Invalid tool: ${call.toolName}`);
        return null;
      }

      const validation = validateCallToolArguments(call);
      if (!validation.isValid) {
        console.error(
          `Invalid arguments for ${call.toolName}: ${validation.error}`,
        );
        interrupt();
        sendMessage(`{
             content:${textRef.current},
             error:Invalid arguments for ${call.toolName}: ${validation.error}
            }`);
        return null;
      }

      try {
        const command: AICommand = {
          type: call.toolName as CommandType,
          message: `Executing ${call.toolName}`,
          data: call.arguments,
        } as AICommand;

        const result = await execute(command);

        const commandMessage = buildCommandMessage(call, result);
        if (result.data) {
          setCurrentAIMessage({
            content: commandMessage,
            data: result.data,
            role: "assistant",
          });
        }

        return commandMessage;
      } catch (error) {
        console.error(`Error executing ${call.toolName}:`, error);
        return `Failed to execute ${call.toolName}: ${error}`;
      }
    },
    onDownloadProgress: (progress) => {
      setDownloadProgress(progress);
    },
  });

  const handleSendMessage = useCallback(
    async (text: string) => {
      if (!isReady || isGenerating) return;

      Keyboard.dismiss();

      textRef.current = text;

      const result = await sendMessage(text);

      return;
    },
    [isReady, isGenerating],
  );

  return {
    currentAIMessage,
    downloadProgress,
    handleSendMessage,
    isReady,
    isGenerating,
  };
}
