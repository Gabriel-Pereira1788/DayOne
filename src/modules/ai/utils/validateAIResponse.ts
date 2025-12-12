import { AICommand } from "../domain/ai.model";

export function validateAIResponse(response: string): AICommand | null {
  try {
    const parsed = JSON.parse(response);

    if (!parsed.type || !parsed.message) {
      return null;
    }

    const validTypes = [
      "CREATE_HABIT",
      "GET_HABITS",
      "SEARCH_HABITS",
      "GET_HABIT_DETAILS",
      "UPDATE_HABIT",
      "DELETE_HABIT",
      "RESPONSE",
    ];

    if (!validTypes.includes(parsed.type)) {
      return null;
    }

    return parsed as AICommand;
  } catch {
    return null;
  }
}
