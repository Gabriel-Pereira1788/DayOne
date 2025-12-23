import { Tool } from "@/infra/adapters/llm/types";
import { validateCallTool, validateCallToolArguments } from "../validateCallTool";

describe("validateCallTool", () => {
  describe("validateCallTool function", () => {
    it("should return true for valid CREATE_HABIT command", () => {
      const call: Tool = {
        toolName: "CREATE_HABIT",
        arguments: {},
      };
      
      expect(validateCallTool(call)).toBe(true);
    });

    it("should return true for valid GET_HABITS command", () => {
      const call: Tool = {
        toolName: "GET_HABITS",
        arguments: {},
      };
      
      expect(validateCallTool(call)).toBe(true);
    });

    it("should return true for valid SEARCH_HABITS command", () => {
      const call: Tool = {
        toolName: "SEARCH_HABITS",
        arguments: {},
      };
      
      expect(validateCallTool(call)).toBe(true);
    });

    it("should return true for valid GET_HABIT_DETAILS command", () => {
      const call: Tool = {
        toolName: "GET_HABIT_DETAILS",
        arguments: {},
      };
      
      expect(validateCallTool(call)).toBe(true);
    });

    it("should return true for valid UPDATE_HABIT command", () => {
      const call: Tool = {
        toolName: "UPDATE_HABIT",
        arguments: {},
      };
      
      expect(validateCallTool(call)).toBe(true);
    });

    it("should return true for valid DELETE_HABIT command", () => {
      const call: Tool = {
        toolName: "DELETE_HABIT",
        arguments: {},
      };
      
      expect(validateCallTool(call)).toBe(true);
    });

    it("should return false for invalid command", () => {
      const call: Tool = {
        toolName: "INVALID_COMMAND",
        arguments: {},
      };
      
      expect(validateCallTool(call)).toBe(false);
    });

    it("should return false for empty command", () => {
      const call: Tool = {
        toolName: "",
        arguments: {},
      };
      
      expect(validateCallTool(call)).toBe(false);
    });
  });

  describe("validateCallToolArguments function", () => {
    describe("General validation", () => {
      it("should return error if call is null", () => {
        const result = validateCallToolArguments(null as any);
        
        expect(result.isValid).toBe(false);
        expect(result.error).toBe("Tool call is required");
      });

      it("should return error if call is undefined", () => {
        const result = validateCallToolArguments(undefined as any);
        
        expect(result.isValid).toBe(false);
        expect(result.error).toBe("Tool call is required");
      });

      it("should return error for unknown command", () => {
        const call: Tool = {
          toolName: "UNKNOWN_COMMAND",
          arguments: {},
        };
        
        const result = validateCallToolArguments(call);
        
        expect(result.isValid).toBe(false);
        expect(result.error).toBe("Unknown command: UNKNOWN_COMMAND");
      });

      it("should return error if toolName is missing", () => {
        const call: any = {
          arguments: {},
        };
        
        const result = validateCallToolArguments(call);
        
        expect(result.isValid).toBe(false);
        expect(result.error).toBe("Unknown command: undefined");
      });
    });

    describe("CREATE_HABIT validation", () => {
      it("should validate valid CREATE_HABIT with daily frequency", () => {
        const call: Tool = {
          toolName: "CREATE_HABIT",
          arguments: {
            title: "Test Habit",
            frequency: "daily",
            hours: 10,
            minutes: 30,
          },
        };
        
        const result = validateCallToolArguments(call);
        
        expect(result.isValid).toBe(true);
        expect(result.error).toBeUndefined();
      });

      it("should validate valid CREATE_HABIT with weekly frequency", () => {
        const call: Tool = {
          toolName: "CREATE_HABIT",
          arguments: {
            title: "Test Habit",
            frequency: "weekly",
            hours: 10,
            minutes: 30,
            dayOfWeek: 3,
          },
        };
        
        const result = validateCallToolArguments(call);
        
        expect(result.isValid).toBe(true);
        expect(result.error).toBeUndefined();
      });

      it("should validate valid CREATE_HABIT with monthly frequency", () => {
        const call: Tool = {
          toolName: "CREATE_HABIT",
          arguments: {
            title: "Test Habit",
            frequency: "monthly",
            hours: 10,
            minutes: 30,
            dayOfMonth: 15,
          },
        };
        
        const result = validateCallToolArguments(call);
        
        expect(result.isValid).toBe(true);
        expect(result.error).toBeUndefined();
      });

      it("should return error for missing required fields", () => {
        const call: Tool = {
          toolName: "CREATE_HABIT",
          arguments: {
            title: "Test Habit",
            // missing frequency, hours, minutes
          },
        };
        
        const result = validateCallToolArguments(call);
        
        expect(result.isValid).toBe(false);
        expect(result.error).toBe("Missing required field: frequency");
      });

      it("should return error for invalid frequency value", () => {
        const call: Tool = {
          toolName: "CREATE_HABIT",
          arguments: {
            title: "Test Habit",
            frequency: "invalid",
            hours: 10,
            minutes: 30,
          },
        };
        
        const result = validateCallToolArguments(call);
        
        expect(result.isValid).toBe(false);
        expect(result.error).toBe("Invalid frequency value");
      });

      it("should return error for invalid hours", () => {
        const call: Tool = {
          toolName: "CREATE_HABIT",
          arguments: {
            title: "Test Habit",
            frequency: "daily",
            hours: 24,
            minutes: 30,
          },
        };
        
        const result = validateCallToolArguments(call);
        
        expect(result.isValid).toBe(false);
        expect(result.error).toBe("Hours must be between 0 and 23");
      });

      it("should return error for negative hours", () => {
        const call: Tool = {
          toolName: "CREATE_HABIT",
          arguments: {
            title: "Test Habit",
            frequency: "daily",
            hours: -1,
            minutes: 30,
          },
        };
        
        const result = validateCallToolArguments(call);
        
        expect(result.isValid).toBe(false);
        expect(result.error).toBe("Hours must be between 0 and 23");
      });

      it("should return error for invalid minutes", () => {
        const call: Tool = {
          toolName: "CREATE_HABIT",
          arguments: {
            title: "Test Habit",
            frequency: "daily",
            hours: 10,
            minutes: 60,
          },
        };
        
        const result = validateCallToolArguments(call);
        
        expect(result.isValid).toBe(false);
        expect(result.error).toBe("Minutes must be between 0 and 59");
      });

      it("should return error for negative minutes", () => {
        const call: Tool = {
          toolName: "CREATE_HABIT",
          arguments: {
            title: "Test Habit",
            frequency: "daily",
            hours: 10,
            minutes: -1,
          },
        };
        
        const result = validateCallToolArguments(call);
        
        expect(result.isValid).toBe(false);
        expect(result.error).toBe("Minutes must be between 0 and 59");
      });

      it("should return error for weekly habit without dayOfWeek", () => {
        const call: Tool = {
          toolName: "CREATE_HABIT",
          arguments: {
            title: "Test Habit",
            frequency: "weekly",
            hours: 10,
            minutes: 30,
          },
        };
        
        const result = validateCallToolArguments(call);
        
        expect(result.isValid).toBe(false);
        expect(result.error).toBe("Weekly habits require dayOfWeek (0-6)");
      });

      it("should return error for weekly habit with invalid dayOfWeek", () => {
        const call: Tool = {
          toolName: "CREATE_HABIT",
          arguments: {
            title: "Test Habit",
            frequency: "weekly",
            hours: 10,
            minutes: 30,
            dayOfWeek: 7,
          },
        };
        
        const result = validateCallToolArguments(call);
        
        expect(result.isValid).toBe(false);
        expect(result.error).toBe("Weekly habits require dayOfWeek (0-6)");
      });

      it("should return error for monthly habit without dayOfMonth", () => {
        const call: Tool = {
          toolName: "CREATE_HABIT",
          arguments: {
            title: "Test Habit",
            frequency: "monthly",
            hours: 10,
            minutes: 30,
          },
        };
        
        const result = validateCallToolArguments(call);
        
        expect(result.isValid).toBe(false);
        expect(result.error).toBe("Monthly habits require dayOfMonth (1-31)");
      });

      it("should return error for monthly habit with invalid dayOfMonth", () => {
        const call: Tool = {
          toolName: "CREATE_HABIT",
          arguments: {
            title: "Test Habit",
            frequency: "monthly",
            hours: 10,
            minutes: 30,
            dayOfMonth: 32,
          },
        };
        
        const result = validateCallToolArguments(call);
        
        expect(result.isValid).toBe(false);
        expect(result.error).toBe("Monthly habits require dayOfMonth (1-31)");
      });
    });

    describe("GET_HABITS validation", () => {
      it("should validate GET_HABITS with no arguments", () => {
        const call: Tool = {
          toolName: "GET_HABITS",
          arguments: {},
        };
        
        const result = validateCallToolArguments(call);
        
        expect(result.isValid).toBe(true);
        expect(result.error).toBeUndefined();
      });

      it("should validate GET_HABITS with undefined arguments", () => {
        const call: Tool = {
          toolName: "GET_HABITS",
          arguments: undefined as any,
        };
        
        const result = validateCallToolArguments(call);
        
        expect(result.isValid).toBe(true);
        expect(result.error).toBeUndefined();
      });
    });

    describe("SEARCH_HABITS validation", () => {
      it("should validate valid SEARCH_HABITS", () => {
        const call: Tool = {
          toolName: "SEARCH_HABITS",
          arguments: {
            query: "test search",
          },
        };
        
        const result = validateCallToolArguments(call);
        
        expect(result.isValid).toBe(true);
        expect(result.error).toBeUndefined();
      });

      it("should return error for missing query", () => {
        const call: Tool = {
          toolName: "SEARCH_HABITS",
          arguments: {},
        };
        
        const result = validateCallToolArguments(call);
        
        expect(result.isValid).toBe(false);
        expect(result.error).toBe("Missing required field: query");
      });

      it("should validate SEARCH_HABITS with empty query string", () => {
        const call: Tool = {
          toolName: "SEARCH_HABITS",
          arguments: {
            query: "",
          },
        };
        
        const result = validateCallToolArguments(call);
        
        expect(result.isValid).toBe(true);
        expect(result.error).toBeUndefined();
      });
    });

    describe("GET_HABIT_DETAILS validation", () => {
      it("should validate valid GET_HABIT_DETAILS", () => {
        const call: Tool = {
          toolName: "GET_HABIT_DETAILS",
          arguments: {
            id: "habit-123",
          },
        };
        
        const result = validateCallToolArguments(call);
        
        expect(result.isValid).toBe(true);
        expect(result.error).toBeUndefined();
      });

      it("should return error for missing id", () => {
        const call: Tool = {
          toolName: "GET_HABIT_DETAILS",
          arguments: {},
        };
        
        const result = validateCallToolArguments(call);
        
        expect(result.isValid).toBe(false);
        expect(result.error).toBe("Missing required field: id");
      });
    });

    describe("UPDATE_HABIT validation", () => {
      it("should validate valid UPDATE_HABIT", () => {
        const call: Tool = {
          toolName: "UPDATE_HABIT",
          arguments: {
            id: "habit-123",
            updates: {
              title: "Updated Title",
            },
          },
        };
        
        const result = validateCallToolArguments(call);
        
        expect(result.isValid).toBe(true);
        expect(result.error).toBeUndefined();
      });

      it("should validate UPDATE_HABIT with empty updates object", () => {
        const call: Tool = {
          toolName: "UPDATE_HABIT",
          arguments: {
            id: "habit-123",
            updates: {},
          },
        };
        
        const result = validateCallToolArguments(call);
        
        expect(result.isValid).toBe(true);
        expect(result.error).toBeUndefined();
      });

      it("should return error for missing id", () => {
        const call: Tool = {
          toolName: "UPDATE_HABIT",
          arguments: {
            updates: {},
          },
        };
        
        const result = validateCallToolArguments(call);
        
        expect(result.isValid).toBe(false);
        expect(result.error).toBe("Missing required field: id");
      });

      it("should return error for missing updates", () => {
        const call: Tool = {
          toolName: "UPDATE_HABIT",
          arguments: {
            id: "habit-123",
          },
        };
        
        const result = validateCallToolArguments(call);
        
        expect(result.isValid).toBe(false);
        expect(result.error).toBe("Missing required field: updates");
      });

      it("should return error for invalid updates type", () => {
        const call: Tool = {
          toolName: "UPDATE_HABIT",
          arguments: {
            id: "habit-123",
            updates: "not an object" as any,
          },
        };
        
        const result = validateCallToolArguments(call);
        
        expect(result.isValid).toBe(false);
        expect(result.error).toBe("Updates must be an object");
      });

      it("should return error for null updates", () => {
        const call: Tool = {
          toolName: "UPDATE_HABIT",
          arguments: {
            id: "habit-123",
            updates: null as any,
          },
        };
        
        const result = validateCallToolArguments(call);
        
        expect(result.isValid).toBe(false);
        expect(result.error).toBe("Updates must be an object");
      });
    });

    describe("DELETE_HABIT validation", () => {
      it("should validate valid DELETE_HABIT", () => {
        const call: Tool = {
          toolName: "DELETE_HABIT",
          arguments: {
            id: "habit-123",
          },
        };
        
        const result = validateCallToolArguments(call);
        
        expect(result.isValid).toBe(true);
        expect(result.error).toBeUndefined();
      });

      it("should return error for missing id", () => {
        const call: Tool = {
          toolName: "DELETE_HABIT",
          arguments: {},
        };
        
        const result = validateCallToolArguments(call);
        
        expect(result.isValid).toBe(false);
        expect(result.error).toBe("Missing required field: id");
      });

      it("should validate DELETE_HABIT with empty string id", () => {
        const call: Tool = {
          toolName: "DELETE_HABIT",
          arguments: {
            id: "",
          },
        };
        
        const result = validateCallToolArguments(call);
        
        expect(result.isValid).toBe(true);
        expect(result.error).toBeUndefined();
      });
    });
  });
});