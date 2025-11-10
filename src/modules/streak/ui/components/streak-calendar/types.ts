import { HabitId } from "@/modules/habit/domain/habit.model";
import { IconProps } from "@/shared/ui";

export interface StreakCalendarProps {
  habitId: HabitId;
  habitIcon?:IconProps['iconName']
}
