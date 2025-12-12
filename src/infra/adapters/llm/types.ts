import { Habit } from "@/modules/habit/domain/habit.model";

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
  generate(messages: Message[]): Promise<LLMResponse>;
  isInitialized(): boolean;
  deleteModel(): void;
}
