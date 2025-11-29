import { IconProps } from "@/shared/ui";

export type HabitId = string;
export interface Habit {
  id: HabitId;
  title: string;
  description?: string;
  icon?: IconProps["iconName"];
  targetDurationInDays?: number;
  startDate: string;
  frequency: "daily" | "weekly" | "monthly";
  hours: number;
  minutes: number;
  dayOfWeek?: number;
  dayOfMonth?: number;
  endDate?: string;
  completed?: boolean;
}

export interface HabitDTO {
  title: string;
  frequency: "daily" | "weekly" | "monthly";
  dayOfWeek?: number;
  dayOfMonth?: number;
  hours: number;
  minutes: number;
  icon?: IconProps["iconName"];
  description: string;
  targetDurationInDays: number;
}
