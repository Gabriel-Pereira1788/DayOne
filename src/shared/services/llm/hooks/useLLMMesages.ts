import { Message, Tool } from "@/infra/adapters/llm/types";
import { useEffect, useState } from "react";
import { useLLM } from "@/infra/adapters/llm/hooks/useLLM";

type Props = {
  systemPrompt: string;
  onDownloadProgress: (progress: number) => void;
  onExecuteToolCallback: (call: Tool) => Promise<string | null>;
  onTokenCallback?: (token: string) => void;
  tools: Object[];
};

export function useLLMMessages({
  systemPrompt,
  onDownloadProgress,
  onExecuteToolCallback,
  onTokenCallback,
  tools,
}: Props) {
  const llm = useLLM();

  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initializeLLM = async () => {
      try {
        setError(null);
        await llm.initialize({
          onDownloadProgress,
          tokenCallback: onTokenCallback,
        });
        llm.configure({
          initialMessageHistory:[],
          systemPrompt,
          executeToolCallback: onExecuteToolCallback,
          tools,
        });
        setIsReady(true);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao inicializar LLM";
        setError(errorMessage);
        setIsReady(false);
      }
    };

    initializeLLM();

    return () => {
      llm.deleteModel();
    };
  }, [llm]);

  async function sendMessage(content: string) {
    try {
      setIsGenerating(true);
      const messages = await llm.sendMessage(content);
      return messages;
    } catch (err) {
      console.error("Error on send message:", err);
    } finally {
      setIsGenerating(false);
    }
  }

  function interrupt() {
    llm.interrupt();
    setIsGenerating(false);
  }
  return {
    sendMessage,
    interrupt,
    isReady,
    error,
    isGenerating,
  };
}
