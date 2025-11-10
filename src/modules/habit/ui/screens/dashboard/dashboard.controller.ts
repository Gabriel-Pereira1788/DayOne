import { HabitId } from "@/modules/habit/domain/habit.model";
import { useGetHabits } from "@/modules/habit/domain/useCases/get-habits";
import { router } from "expo-router";

export function useDashboardController() {
  const { habits, isLoading } = useGetHabits();

  function redirectToHabitDetails(habitId: HabitId) {
    router.push(`/habit-details/${habitId}`);
  }
  return {
    habits,
    isLoading,
    redirectToHabitDetails,
  };
}
