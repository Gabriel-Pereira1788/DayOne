export interface Streak {
  id: string;
  habitId: string;
  createdAt?: string;
}

export interface StreakData {
  habitId: string;
  currentStreak: number;
  longestStreak: number;
  completedDates: Date[];
  isActiveToday: boolean;
}
