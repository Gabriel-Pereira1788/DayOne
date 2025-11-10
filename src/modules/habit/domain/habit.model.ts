import { IconProps } from "@/shared/ui";

export type HabitId = string;
export interface Habit {
  id: HabitId;
  title: string;
  description?: string;

  icon?: IconProps["iconName"];
  targetDurationInDays?: number;
  startDate: string;
  endDate?: string;
  completed?: boolean;
}

export interface HabitDTO {
  title: string;
  icon?: IconProps["iconName"];
  description: string;
  targetDurationInDays: number;
}
