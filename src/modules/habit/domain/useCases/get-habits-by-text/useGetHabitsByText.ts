import { HabitQueryKeys } from "@/modules/habit/types";
import { useQuery } from "@tanstack/react-query";
import { getHabitsByText } from "./get-habits-by-text.service";
import { useRepository } from "@/infra/repository/hooks/useRepository";

export function useGetHabitsByText(text: string) {
  const repositoryService = useRepository();
  const { data, isLoading } = useQuery({
    queryKey: [HabitQueryKeys.GET_HABITS, text],
    queryFn: () => getHabitsByText(text, repositoryService),
  });

  return {
    habits: data,
    isLoading,
  };
}
