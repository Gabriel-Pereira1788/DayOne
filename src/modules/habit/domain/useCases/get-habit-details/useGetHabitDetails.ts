import { useQuery } from "@tanstack/react-query";
import { HabitId } from "../../habit.model";
import { HabitQueryKeys } from "@/modules/habit/types";
import { getHabitDetailsService } from "./get-habit-details.service";

export function useGetHabitDetails(id: HabitId) {
  const { data, isLoading } = useQuery({
    queryKey: [HabitQueryKeys.GET_HABIT_DETAILS, id],
    queryFn: () => getHabitDetailsService(id),
  });
  return {
    habit: data,
    isLoading,
  };
}
