import { Message } from "@/infra/adapters/llm/types";
import { removeThinkContent } from "../../utils/removeThinkContent";
import { AIScreenActionType, AIScreenState } from "./types";

export function reducer(
  state: AIScreenState,
  action: AIScreenActionType,
): AIScreenState {
  switch (action.type) {
    case "ADD_USER_MESSAGE":
      const newUserMessage = {
        id: new Date().getTime().toString(),
        ...action.payload,
      };
      return {
        ...state,
        currentToken:"",
        messages: [...state.messages, newUserMessage],
      };
    case "ADD_AI_MESSAGE":
      const newAIMessage: Message = {
        id: new Date().getTime().toString(),
        content: removeThinkContent(action.payload.content),
        role: action.payload.role,
        data: action.payload.data,
      };
      return {
        ...state,
        currentToken: "",
        streamingMessage: "",
        messages: [...state.messages, newAIMessage],
      };
    case "SET_SHOW_BACK_TO_END":
      return {
        ...state,
        showBackToEnd: action.payload,
      };
    case "SET_CURRENT_TOKEN":
      return {
        ...state,
        currentToken: action.payload,
        streamingMessage: state.streamingMessage + action.payload,
      };

    case "SET_CURRENT_AI_MESSAGE":
      return {
        ...state,
        currentToken:"",
        currentAIMessage: action.payload,
      };
    default:
      return state;
  }
}
