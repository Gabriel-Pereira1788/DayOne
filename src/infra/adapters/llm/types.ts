import { Habit } from "@/modules/habit/domain/habit.model";
import { ToolCall } from "react-native-executorch";

export type MessageRole = "user" | "assistant" | "system" | "typing";
export type Message = {
  id?: string;
  role: MessageRole;
  content: string;
  data?: Habit | Habit[];
};

export type LLMResponse = {
  content: string;
  error?: string;
};

export interface InitializeProps {
  onDownloadProgress: (progress: number) => void;
  tokenCallback?: (token: string) => void;
}

export interface LLMServiceImpl {
  initialize({ onDownloadProgress }: InitializeProps): Promise<void>;
  sendMessage(content: string): Promise<Message[]>;
  isInitialized(): boolean;
  deleteModel(): void;
  interrupt(): void;
  configure(config: Configure): void;
}

export interface Tool {
  toolName: string;
  arguments: Object;
}

export interface Configure {
  systemPrompt: string;
  initialMessageHistory?: Message[];
  tools: Object[];
  executeToolCallback: (call: Tool) => Promise<string | null>;
}
