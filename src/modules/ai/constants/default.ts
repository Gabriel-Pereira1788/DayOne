import { Message } from "@/infra/adapters/llm/types";

export const DEFAULT_AI_MESSAGE: Message = {
  content:
    "Hello, I am your personal assistant for habit management. I can show your habits, create new habits, or search for specific habits.",
  role: "assistant",
};
