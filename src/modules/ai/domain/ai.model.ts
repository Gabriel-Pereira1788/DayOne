import { HabitDTO } from "@/modules/habit/domain/habit.model";

// Tipos base para comandos
export type CommandType =
  | "CREATE_HABIT"
  | "GET_HABITS"
  | "SEARCH_HABITS"
  | "GET_HABIT_DETAILS"
  | "UPDATE_HABIT"
  | "DELETE_HABIT"
  | "RESPONSE";

export interface BaseCommand {
  type: CommandType;
  message: string;
}

export interface CreateHabitCommand extends BaseCommand {
  type: "CREATE_HABIT";
  data: HabitDTO;
}

export interface GetHabitsCommand extends BaseCommand {
  type: "GET_HABITS";
  data: Record<string, never>; // objeto vazio
}

export interface SearchHabitsCommand extends BaseCommand {
  type: "SEARCH_HABITS";
  data: {
    query: string;
  };
}

export interface GetHabitDetailsCommand extends BaseCommand {
  type: "GET_HABIT_DETAILS";
  data: {
    id: string;
  };
}

export interface UpdateHabitCommand extends BaseCommand {
  type: "UPDATE_HABIT";
  data: {
    id: string;
    updates: Partial<HabitDTO>;
  };
}

export interface DeleteHabitCommand extends BaseCommand {
  type: "DELETE_HABIT";
  data: {
    id: string;
  };
}

export interface ResponseCommand extends BaseCommand {
  type: "RESPONSE";
  data: {
    text: string;
  };
}

export type AICommand =
  | CreateHabitCommand
  | GetHabitsCommand
  | SearchHabitsCommand
  | GetHabitDetailsCommand
  | UpdateHabitCommand
  | DeleteHabitCommand
  | ResponseCommand;
