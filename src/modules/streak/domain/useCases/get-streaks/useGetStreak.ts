import { StreaksQueryKeys } from "@/modules/streak/types";
import { useQuery } from "@tanstack/react-query";
import { getStreakService } from "./get-streak.service";
import { useRepository } from "@/infra/repository/hooks/useRepository";

export function useGetStreaks(habitId: string) {
  const repositoryService = useRepository();
  const { data, isLoading } = useQuery({
    queryKey: [StreaksQueryKeys.GET_STREAKS, habitId],
    queryFn: () => getStreakService(habitId, repositoryService),
  });

  return {
    streaks: data,
    isLoading,
  };
}
