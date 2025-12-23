import { Tool } from "@/infra/adapters/llm/types";
import { CommandExecutorResult } from "../../domain/useCases/execute-ai-command/types";
import { buildCommandMessage } from "../buildCommandMessage";

describe("buildCommandMessage", () => {
  // Mock base do CommandExecutorResult
  const mockResult: CommandExecutorResult = {
    success: true,
    data: null,
    originalCommand: {
      type: "CREATE_HABIT",
      message: "",
      data: {} as any,
    },
  };

  it("should return success message for CREATE_HABIT", () => {
    const call: Tool = {
      toolName: "CREATE_HABIT",
      arguments: {},
    };

    const message = buildCommandMessage(call, mockResult);
    expect(message).toBe("Habit created successfully!");
  });

  it("should return appropriate message for GET_HABITS", () => {
    const call: Tool = {
      toolName: "GET_HABITS",
      arguments: {},
    };

    const message = buildCommandMessage(call, mockResult);
    expect(message).toBe("Here are your habits:");
  });

  it("should return message with count for SEARCH_HABITS with array data", () => {
    const call: Tool = {
      toolName: "SEARCH_HABITS",
      arguments: {},
    };
    const resultWithArray = {
      ...mockResult,
      data: [{}, {}, {}], // 3 habits
    };

    const message = buildCommandMessage(call, resultWithArray);
    expect(message).toBe("Found 3 habits matching your search:");
  });

  it("should return message with 0 count for SEARCH_HABITS with empty array", () => {
    const call: Tool = {
      toolName: "SEARCH_HABITS",
      arguments: {},
    };
    const resultWithEmptyArray = {
      ...mockResult,
      data: [],
    };

    const message = buildCommandMessage(call, resultWithEmptyArray);
    expect(message).toBe("Found 0 habits matching your search:");
  });

  it("should return message with 0 count for SEARCH_HABITS with non-array data", () => {
    const call: Tool = {
      toolName: "SEARCH_HABITS",
      arguments: {},
    };
    const resultWithNonArray = {
      ...mockResult,
      data: { notAnArray: true },
    };

    const message = buildCommandMessage(call, resultWithNonArray);
    expect(message).toBe("Found 0 habits matching your search:");
  });

  it("should return appropriate message for GET_HABIT_DETAILS", () => {
    const call: Tool = {
      toolName: "GET_HABIT_DETAILS",
      arguments: {},
    };

    const message = buildCommandMessage(call, mockResult);
    expect(message).toBe("Here are the habit details:");
  });

  it("should return success message for UPDATE_HABIT", () => {
    const call: Tool = {
      toolName: "UPDATE_HABIT",
      arguments: {},
    };

    const message = buildCommandMessage(call, mockResult);
    expect(message).toBe("Habit updated successfully!");
  });

  it("should return success message for DELETE_HABIT", () => {
    const call: Tool = {
      toolName: "DELETE_HABIT",
      arguments: {},
    };

    const message = buildCommandMessage(call, mockResult);
    expect(message).toBe("Habit deleted successfully!");
  });

  it("should return default message for unknown command", () => {
    const call: Tool = {
      toolName: "UNKNOWN_COMMAND",
      arguments: {},
    };

    const message = buildCommandMessage(call, mockResult);
    expect(message).toBe("Operation completed.");
  });

  it("should return default message for empty command", () => {
    const call: Tool = {
      toolName: "",
      arguments: {},
    };

    const message = buildCommandMessage(call, mockResult);
    expect(message).toBe("Operation completed.");
  });
});