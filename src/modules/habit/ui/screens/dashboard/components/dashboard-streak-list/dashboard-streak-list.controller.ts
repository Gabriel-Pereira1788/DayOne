import { useGetHabits } from "@/modules/habit/domain/useCases/get-habits";

export function useDashboardStreakListController() {
  const { habits, isLoading } = useGetHabits();
  return {
    habits,
    isLoading,
  };
}
