import { useGetHabitDetails } from "@/modules/habit/domain/useCases/get-habit-details/useGetHabitDetails";
import { useLocalSearchParams } from "expo-router";

export function useHabitDetailsController() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { habit, isLoading } = useGetHabitDetails(id);

  return {
    habit,
    isLoading,
  };
}
