import { AICommand } from "../domain/ai.model";

export function validateAIResponse(response: string): AICommand | null {
  try {
    let cleanedResponse = response.trim();

    if (cleanedResponse.startsWith("```") && cleanedResponse.endsWith("```")) {
      cleanedResponse = cleanedResponse.substring(3);

      cleanedResponse = cleanedResponse.substring(
        0,
        cleanedResponse.length - 3,
      );

      if (
        cleanedResponse.startsWith("json") ||
        cleanedResponse.startsWith("JSON")
      ) {
        cleanedResponse = cleanedResponse.replace(/^(json|JSON)\s*\n?/, "");
      }

      cleanedResponse = cleanedResponse.trim();
    }

    const parsed = JSON.parse(cleanedResponse);

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
  } catch (err) {
    console.log("ERROR", err);
    return null;
  }
}
