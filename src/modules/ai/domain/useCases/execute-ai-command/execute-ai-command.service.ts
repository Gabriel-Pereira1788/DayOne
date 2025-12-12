import { createNewHabitService } from "@/modules/habit/domain/useCases/create-new-habit/create-new-habit.service";
import { AICommand } from "../../ai.model";
import { CommandExecutorResult } from "./types";
import { getHabitsService } from "@/modules/habit/domain/useCases/get-habits/get-habits.service";
import { getHabitsByText } from "@/modules/habit/domain/useCases/get-habits-by-text/get-habits-by-text.service";
import { getHabitDetailsService } from "@/modules/habit/domain/useCases/get-habit-details/get-habit-details.service";
import { editHabitService } from "@/modules/habit/domain/useCases/edit-habit/edit-habit.service";
import { deleteHabitService } from "@/modules/habit/domain/useCases/delete-habit/delete-habit.service";

export async function executeAICommandService(
  command: AICommand,
): Promise<CommandExecutorResult> {
  try {
    switch (command.type) {
      case "CREATE_HABIT": {
        const result = await createNewHabitService(command.data);
        return {
          success: true,
          data: result,
          originalCommand: command,
        };
      }

      case "GET_HABITS": {
        const habits = await getHabitsService();
        return {
          success: true,
          data: habits,
          originalCommand: command,
        };
      }

      case "SEARCH_HABITS": {
        const habits = await getHabitsByText(command.data.query);
        return {
          success: true,
          data: habits,
          originalCommand: command,
        };
      }

      case "GET_HABIT_DETAILS": {
        const habit = await getHabitDetailsService(command.data.id);
        if (!habit) throw new Error("Habit not found");

        return {
          success: true,
          data: habit,
          originalCommand: command,
        };
      }

      case "UPDATE_HABIT": {
        const { id, updates } = command.data;
        const result = await editHabitService(id, updates);
        return {
          success: true,
          data: result,
          originalCommand: command,
        };
      }

      case "DELETE_HABIT": {
        await deleteHabitService(command.data.id);
        return {
          success: true,
          data: { deleted: true, id: command.data.id },
          originalCommand: command,
        };
      }

      case "RESPONSE": {
        return {
          success: true,
          data: { message: command.data.text },
          originalCommand: command,
        };
      }

      default:
        return {
          success: false,
          error: `Command not recognized: ${(command as any).type}`,
          originalCommand: command,
        };
    }
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown error occurred while executing command",
      originalCommand: command,
    };
  }
}
