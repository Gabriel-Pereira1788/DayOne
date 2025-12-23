import { Message } from "@/infra/adapters/llm/types";

export interface AICurrentMessageProps {
  currentAIMessage: Message | null;
}
