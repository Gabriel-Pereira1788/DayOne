export type HabitId = string;
export interface Habit {
  id: HabitId;
  title: string;
  description?: string;
  icon?: string;
  targetDurationInDays?: number;
  startDate: string;
  endDate?: string;
  completed?: boolean;
}

export interface HabitDTO {
  title: string;
  icon?: string;
  description: string;
  targetDurationInDays: number;
}
