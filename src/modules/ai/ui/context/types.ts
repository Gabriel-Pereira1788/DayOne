import { Message } from "@/infra/adapters/llm/types";

export interface AIScreenState {
  messages: Message[];
  currentToken: string;
  currentAIMessage: Message | null;
  streamingMessage: string;
  showBackToEnd: boolean;
}

export interface AIScreenContextStateType {
  state: AIScreenState;
  dispatch: React.Dispatch<AIScreenActionType>;
}

export type AIScreenActionType =
  | {
      type: "ADD_USER_MESSAGE";
      payload: Message;
    }
  | {
      type: "ADD_AI_MESSAGE";
      payload: Message;
    }
  | {
      type: "SET_SHOW_BACK_TO_END";
      payload: boolean;
    }
  | {
      type: "SET_CURRENT_TOKEN";
      payload: string;
    }
  | {
      type: "SET_CURRENT_AI_MESSAGE";
      payload: Message | null;
    };
