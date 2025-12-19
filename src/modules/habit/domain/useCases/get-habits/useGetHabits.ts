import { HabitQueryKeys } from "@/modules/habit/types";
import { useQuery } from "@tanstack/react-query";
import { getHabitsService } from "./get-habits.service";
import { useRepository } from "@/infra/repository/hooks/useRepository";

export function useGetHabits() {
  const repositoryService = useRepository();
  const { data, isLoading } = useQuery({
    queryKey: [HabitQueryKeys.GET_HABITS],
    queryFn: () => getHabitsService(repositoryService),
  });
  return {
    habits: data,
    isLoading,
  };
}
