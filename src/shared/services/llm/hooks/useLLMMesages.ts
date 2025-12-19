import { LLMResponse, Message } from "@/infra/adapters/llm/types";
import { useEffect, useState } from "react";
import { useLLM } from "@/infra/adapters/llm/hooks/useLLM";

type Props = {
  systemPrompt: string;
  context: Message[];
  onDownloadProgress: (progress: number) => void;
  onTokenCallback?: (token: string) => void;
  tools: Object[];
};

export function useLLMMessages({
  systemPrompt,
  context,
  onDownloadProgress,
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
          systemPrompt,
          executeToolCallback: async (call) => {
            console.log("TOKEN-CALLBACK", call);
            return "";
          },
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

  async function generate(content: string) {
    if (!content.trim() || isGenerating || !llm.isInitialized()) {
      return;
    }
    await llm.deleteMessage(0);
    const userMessage: Message = {
      role: "user",
      content: content,
    };

    setError(null);
    setIsGenerating(true);

    try {
      const conversationHistory: Message[] = [
        {
          role: "system",
          content: systemPrompt,
        },
        ...context,
        userMessage,
      ];

      const response: LLMResponse = await llm.generate(conversationHistory);

      if (response.error) {
        setError(response.error);
        return;
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: response.content,
      };

      return assistantMessage;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao gerar resposta";

      setError(errorMessage);
      console.error("Erro ao enviar mensagem:", err);
    } finally {
      setIsGenerating(false);
    }
  }

  return {
    isReady,
    error,
    isGenerating,
    generate,
  };
}
