import { useGetHabits } from "@/modules/habit/domain/useCases/get-habits";

export function useDashboardController() {
  const { habits, isLoading } = useGetHabits();
  return {
    habits,
    isLoading,
  };
}
