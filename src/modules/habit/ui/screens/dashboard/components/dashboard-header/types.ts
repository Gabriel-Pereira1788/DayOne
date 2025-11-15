import { Habit } from "@/modules/habit/domain/habit.model";

export interface DashboardHeaderProps {
  habits: Habit[];
  handleSearch: (searchText: string) => void;
}
