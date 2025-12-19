import { useQuery } from "@tanstack/react-query";
import { HabitId } from "../../habit.model";
import { HabitQueryKeys } from "@/modules/habit/types";
import { getHabitDetailsService } from "./get-habit-details.service";
import { useRepository } from "@/infra/repository/hooks/useRepository";

export function useGetHabitDetails(id: HabitId) {
  const repositoryService = useRepository();
  const { data, isLoading } = useQuery({
    queryKey: [HabitQueryKeys.GET_HABIT_DETAILS, id],
    queryFn: () => getHabitDetailsService(id, repositoryService),
  });
  return {
    habit: data,
    isLoading,
  };
}
