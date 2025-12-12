import { executeAICommandService } from "../execute-ai-command.service";
import { repositoryService } from "@/shared/services/repository";
import { Collection } from "@/infra/repository";
import { habitListMock } from "@/modules/habit/__mocks__/habit-list.mock";
import { AICommand } from "../../../ai.model";
import { HabitDTO, Habit } from "@/modules/habit/domain/habit.model";

beforeEach(() => {
  const habitRepository = repositoryService.collection(Collection.HABITS);
  habitRepository.setMock?.(habitListMock);
});

afterEach(() => {
  const habitRepository = repositoryService.collection(Collection.HABITS);
  habitRepository.setMock?.([]);
});

describe("executeAICommandService", () => {
  describe("CREATE_HABIT command", () => {
    it("should create a new habit successfully", async () => {
      const command: AICommand = {
        type: "CREATE_HABIT",
        message: "Create a new habit for drinking water",
        data: {
          title: "Drink Water",
          description: "Drink 2 liters of water daily",
          frequency: "daily",
          targetDurationInDays: 30,
          hours: 8,
          minutes: 0,
        },
      };

      const result = await executeAICommandService(command);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data.title).toBe("Drink Water");
      expect(result.originalCommand).toEqual(command);
    });

    it("should handle create habit with weekly frequency", async () => {
      const command: AICommand = {
        type: "CREATE_HABIT",
        message: "Create a weekly reading habit",
        data: {
          title: "Read Books",
          description: "Read for 1 hour",
          frequency: "weekly",
          dayOfWeek: 1, // Monday
          targetDurationInDays: 90,
          hours: 19,
          minutes: 30,
        },
      };

      const result = await executeAICommandService(command);

      expect(result.success).toBe(true);
      expect(result.data.frequency).toBe("weekly");
      expect(result.data.dayOfWeek).toBe(1);
    });

    it("should handle create habit with monthly frequency", async () => {
      const command: AICommand = {
        type: "CREATE_HABIT",
        message: "Create a monthly review habit",
        data: {
          title: "Monthly Review",
          description: "Review goals and progress",
          frequency: "monthly",
          dayOfMonth: 15,
          targetDurationInDays: 365,
          hours: 10,
          minutes: 0,
        },
      };

      const result = await executeAICommandService(command);

      expect(result.success).toBe(true);
      expect(result.data.frequency).toBe("monthly");
      expect(result.data.dayOfMonth).toBe(15);
    });

    it("should return error when create habit fails with invalid data", async () => {
      const command: AICommand = {
        type: "CREATE_HABIT",
        message: "Create habit with invalid frequency",
        data: {
          title: "Invalid Habit",
          description: "This should fail",
          frequency: "weekly", // missing dayOfWeek
          targetDurationInDays: 30,
          hours: 8,
          minutes: 0,
        },
      };

      const result = await executeAICommandService(command);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.originalCommand).toEqual(command);
    });
  });

  describe("GET_HABITS command", () => {
    it("should get all habits successfully", async () => {
      const command: AICommand = {
        type: "GET_HABITS",
        message: "Get all my habits",
        data: {},
      };

      const result = await executeAICommandService(command);

      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBe(habitListMock.length);
      expect(result.originalCommand).toEqual(command);
    });
  });

  describe("SEARCH_HABITS command", () => {
    it("should search habits by text successfully", async () => {
      const command: AICommand = {
        type: "SEARCH_HABITS",
        message: "Search for exercise habits",
        data: {
          query: "exerc",
        },
      };

      const result = await executeAICommandService(command);

      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.originalCommand).toEqual(command);
    });

    it("should handle empty search query", async () => {
      const command: AICommand = {
        type: "SEARCH_HABITS",
        message: "Search with empty query",
        data: {
          query: "",
        },
      };

      const result = await executeAICommandService(command);

      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
    });

    it("should handle search query with no matches", async () => {
      const command: AICommand = {
        type: "SEARCH_HABITS",
        message: "Search for non-existent habits",
        data: {
          query: "nonexistent12345",
        },
      };

      const result = await executeAICommandService(command);

      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBe(0);
    });
  });

  describe("GET_HABIT_DETAILS command", () => {
    it("should get habit details successfully", async () => {
      const command: AICommand = {
        type: "GET_HABIT_DETAILS",
        message: "Get details for habit",
        data: {
          id: habitListMock[0].id,
        },
      };

      const result = await executeAICommandService(command);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data.id).toBe(habitListMock[0].id);
      expect(result.data.title).toBe(habitListMock[0].title);
      expect(result.originalCommand).toEqual(command);
    });

    it("should return error when habit not found", async () => {
      const command: AICommand = {
        type: "GET_HABIT_DETAILS",
        message: "Get details for non-existent habit",
        data: {
          id: "non-existent-id",
        },
      };

      const result = await executeAICommandService(command);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.originalCommand).toEqual(command);
    });
  });

  describe("UPDATE_HABIT command", () => {
    it("should update habit title successfully", async () => {
      const command: AICommand = {
        type: "UPDATE_HABIT",
        message: "Update habit title",
        data: {
          id: habitListMock[0].id,
          updates: {
            title: "Updated Exercise Habit",
          },
        },
      };

      const result = await executeAICommandService(command);

      expect(result.success).toBe(true);
      expect(result.data.title).toBe("Updated Exercise Habit");
      expect(result.data.id).toBe(habitListMock[0].id);
      expect(result.originalCommand).toEqual(command);
    });

    it("should update multiple habit properties", async () => {
      const command: AICommand = {
        type: "UPDATE_HABIT",
        message: "Update multiple habit properties",
        data: {
          id: habitListMock[1].id,
          updates: {
            title: "Advanced Meditation",
            description: "Deep meditation practice with mindfulness",
            targetDurationInDays: 60,
          },
        },
      };

      const result = await executeAICommandService(command);

      expect(result.success).toBe(true);
      expect(result.data.title).toBe("Advanced Meditation");
      expect(result.data.description).toBe("Deep meditation practice with mindfulness");
      expect(result.data.targetDurationInDays).toBe(60);
    });

    it("should update habit to weekly frequency", async () => {
      const command: AICommand = {
        type: "UPDATE_HABIT",
        message: "Change habit to weekly",
        data: {
          id: habitListMock[0].id,
          updates: {
            frequency: "weekly",
            dayOfWeek: 3, // Wednesday
          },
        },
      };

      const result = await executeAICommandService(command);

      expect(result.success).toBe(true);
      expect(result.data.frequency).toBe("weekly");
      expect(result.data.dayOfWeek).toBe(3);
    });

    it("should return error when updating non-existent habit", async () => {
      const command: AICommand = {
        type: "UPDATE_HABIT",
        message: "Update non-existent habit",
        data: {
          id: "non-existent-id",
          updates: {
            title: "This should fail",
          },
        },
      };

      const result = await executeAICommandService(command);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.originalCommand).toEqual(command);
    });

    it("should return error when updating with invalid frequency data", async () => {
      const command: AICommand = {
        type: "UPDATE_HABIT",
        message: "Update with invalid frequency",
        data: {
          id: habitListMock[0].id,
          updates: {
            frequency: "weekly", // missing dayOfWeek
          },
        },
      };

      const result = await executeAICommandService(command);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe("DELETE_HABIT command", () => {
    it("should delete habit successfully", async () => {
      const command: AICommand = {
        type: "DELETE_HABIT",
        message: "Delete habit",
        data: {
          id: habitListMock[0].id,
        },
      };

      const result = await executeAICommandService(command);

      expect(result.success).toBe(true);
      expect(result.data.deleted).toBe(true);
      expect(result.data.id).toBe(habitListMock[0].id);
      expect(result.originalCommand).toEqual(command);
    });

    it("should return error when deleting non-existent habit", async () => {
      const command: AICommand = {
        type: "DELETE_HABIT",
        message: "Delete non-existent habit",
        data: {
          id: "non-existent-id",
        },
      };

      const result = await executeAICommandService(command);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.originalCommand).toEqual(command);
    });
  });

  describe("RESPONSE command", () => {
    it("should handle response command successfully", async () => {
      const command: AICommand = {
        type: "RESPONSE",
        message: "Simple response",
        data: {
          text: "Here is your response message",
        },
      };

      const result = await executeAICommandService(command);

      expect(result.success).toBe(true);
      expect(result.data.message).toBe("Here is your response message");
      expect(result.originalCommand).toEqual(command);
    });

    it("should handle empty response text", async () => {
      const command: AICommand = {
        type: "RESPONSE",
        message: "Empty response",
        data: {
          text: "",
        },
      };

      const result = await executeAICommandService(command);

      expect(result.success).toBe(true);
      expect(result.data.message).toBe("");
    });
  });

  describe("Unknown command type", () => {
    it("should return error for unknown command type", async () => {
      const command = {
        type: "UNKNOWN_COMMAND",
        message: "This is an unknown command",
        data: {},
      } as any;

      const result = await executeAICommandService(command);

      expect(result.success).toBe(false);
      expect(result.error).toBe("Command not recognized: UNKNOWN_COMMAND");
      expect(result.originalCommand).toEqual(command);
    });
  });

  describe("Error handling", () => {
    it("should handle and wrap unexpected errors", async () => {
      // Create a command that will cause an error in the underlying service
      const command: AICommand = {
        type: "CREATE_HABIT",
        message: "This will cause an error",
        data: {
          title: "Test Habit",
          description: "Test",
          frequency: "daily",
          targetDurationInDays: 30,
          hours: -1, // Invalid hours that should cause validation error
          minutes: 0,
        },
      };

      const result = await executeAICommandService(command);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(typeof result.error).toBe("string");
      expect(result.originalCommand).toEqual(command);
    });

    it("should preserve original command in all result types", async () => {
      const successCommand: AICommand = {
        type: "GET_HABITS",
        message: "Get all habits",
        data: {},
      };

      const successResult = await executeAICommandService(successCommand);
      expect(successResult.originalCommand).toEqual(successCommand);

      const errorCommand: AICommand = {
        type: "GET_HABIT_DETAILS",
        message: "Get non-existent habit",
        data: {
          id: "non-existent",
        },
      };

      const errorResult = await executeAICommandService(errorCommand);
      expect(errorResult.originalCommand).toEqual(errorCommand);
    });
  });

  describe("Command data integrity", () => {
    it("should maintain data integrity for CREATE_HABIT with all optional fields", async () => {
      const command: AICommand = {
        type: "CREATE_HABIT",
        message: "Create complete habit",
        data: {
          title: "Complete Habit",
          description: "A habit with all fields",
          frequency: "weekly",
          dayOfWeek: 5, // Friday
          targetDurationInDays: 180,
          hours: 14,
          minutes: 30,
        },
      };

      const result = await executeAICommandService(command);

      expect(result.success).toBe(true);
      expect(result.data.title).toBe(command.data.title);
      expect(result.data.description).toBe(command.data.description);
      expect(result.data.frequency).toBe(command.data.frequency);
      expect(result.data.dayOfWeek).toBe(command.data.dayOfWeek);
      expect(result.data.targetDurationInDays).toBe(command.data.targetDurationInDays);
      expect(result.data.hours).toBe(command.data.hours);
      expect(result.data.minutes).toBe(command.data.minutes);
    });

    it("should handle UPDATE_HABIT with partial data correctly", async () => {
      const command: AICommand = {
        type: "UPDATE_HABIT",
        message: "Partial update",
        data: {
          id: habitListMock[2].id,
          updates: {
            title: "Updated Title Only",
          },
        },
      };

      const result = await executeAICommandService(command);

      expect(result.success).toBe(true);
      expect(result.data.title).toBe("Updated Title Only");
      // Should preserve other original fields
      expect(result.data.description).toBe(habitListMock[2].description);
      expect(result.data.frequency).toBe(habitListMock[2].frequency);
    });
  });
});