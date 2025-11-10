import { HabitQueryKeys } from "@/modules/habit/types";
import { useQuery } from "@tanstack/react-query";
import { getHabitsService } from "./get-habits.service";

export function useGetHabits() {
  const { data, isLoading } = useQuery({
    queryKey: [HabitQueryKeys.GET_HABITS],
    queryFn: () => getHabitsService(),
  });
  return {
    habits: data,
    isLoading,
  };
}
