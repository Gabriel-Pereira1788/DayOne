import { Habit, HabitId } from "@/modules/habit/domain/habit.model";
import { IconProps } from "@/shared/ui";

export interface CheckStreakHandlerProps {
  habitId: HabitId;
  habitIcon?: IconProps["iconName"];
  habitTitle: string;
}
