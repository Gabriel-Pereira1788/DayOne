import { Tool } from "@/infra/adapters/llm/types";
import { CommandExecutorResult } from "../domain/useCases/execute-ai-command/types";

export function buildCommandMessage(call: Tool, result: CommandExecutorResult) {
  switch (call.toolName) {
    case "CREATE_HABIT":
      return "Habit created successfully!";
    case "GET_HABITS":
      return "Here are your habits:";
    case "SEARCH_HABITS":
      return `Found ${Array.isArray(result.data) ? result.data.length : 0} habits matching your search:`;
    case "GET_HABIT_DETAILS":
      return "Here are the habit details:";
    case "UPDATE_HABIT":
      return "Habit updated successfully!";
    case "DELETE_HABIT":
      return "Habit deleted successfully!";
    default:
      return "Operation completed.";
  }
}
