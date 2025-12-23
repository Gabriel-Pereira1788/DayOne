import { Tool } from "@/infra/adapters/llm/types";
import { CommandType } from "../domain/ai.model";

const validTypes: CommandType[] = [
  "CREATE_HABIT",
  "GET_HABITS",
  "SEARCH_HABITS",
  "GET_HABIT_DETAILS",
  "UPDATE_HABIT",
  "DELETE_HABIT",
];

// Schema de validação para cada comando
const commandSchemas: Record<string, {
  requiredFields?: string[];
  optionalFields?: string[];
  validate?: (args: any) => { isValid: boolean; error?: string };
}> = {
  CREATE_HABIT: {
    requiredFields: ["title", "frequency", "hours", "minutes"],
    optionalFields: ["description", "targetDurationInDays", "icon", "dayOfWeek", "dayOfMonth"],
    validate: (args) => {
      if (!["daily", "weekly", "monthly"].includes(args.frequency)) {
        return { isValid: false, error: "Invalid frequency value" };
      }
      if (args.hours < 0 || args.hours > 23) {
        return { isValid: false, error: "Hours must be between 0 and 23" };
      }
      if (args.minutes < 0 || args.minutes > 59) {
        return { isValid: false, error: "Minutes must be between 0 and 59" };
      }
      if (args.frequency === "weekly" && (args.dayOfWeek === undefined || args.dayOfWeek < 0 || args.dayOfWeek > 6)) {
        return { isValid: false, error: "Weekly habits require dayOfWeek (0-6)" };
      }
      if (args.frequency === "monthly" && (args.dayOfMonth === undefined || args.dayOfMonth < 1 || args.dayOfMonth > 31)) {
        return { isValid: false, error: "Monthly habits require dayOfMonth (1-31)" };
      }
      return { isValid: true };
    }
  },
  GET_HABITS: {
    requiredFields: [],
  },
  SEARCH_HABITS: {
    requiredFields: ["query"],
  },
  GET_HABIT_DETAILS: {
    requiredFields: ["id"],
  },
  UPDATE_HABIT: {
    requiredFields: ["id", "updates"],
    validate: (args) => {
      if (!args.updates || typeof args.updates !== "object") {
        return { isValid: false, error: "Updates must be an object" };
      }
      return { isValid: true };
    }
  },
  DELETE_HABIT: {
    requiredFields: ["id"],
  },
};

export function validateCallTool(call: Tool) {
  return validTypes.includes(call.toolName as CommandType);
}

export function validateCallToolArguments(call: Tool): {
  isValid: boolean;
  error?: string;
} {
  if (!call) {
    return { isValid: false, error: "Tool call is required" };
  }

  if (!call.toolName || !commandSchemas[call.toolName]) {
    return { isValid: false, error: `Unknown command: ${call.toolName}` };
  }

  const schema = commandSchemas[call.toolName];
  const args = call.arguments || {};

  if (schema.requiredFields) {
    for (const field of schema.requiredFields) {
      if (!(field in args)) {
        return { isValid: false, error: `Missing required field: ${field}` };
      }
    }
  }

  if (schema.validate) {
    return schema.validate(args);
  }

  return { isValid: true };
}
