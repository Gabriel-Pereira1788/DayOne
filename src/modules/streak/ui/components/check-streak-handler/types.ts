import { Habit, HabitId } from "@/modules/habit/domain/habit.model";

export interface CheckStreakHandlerProps {
  habitId: HabitId;
  habitTitle: string;
}
