import { StreaksQueryKeys } from "@/modules/streak/types";
import { useQuery } from "@tanstack/react-query";
import { getStreakService } from "./get-streak.service";

export function useGetStreaks(habitId: string) {
  const { data, isLoading } = useQuery({
    queryKey: [StreaksQueryKeys.GET_STREAKS,habitId],
    queryFn: () => getStreakService(habitId),
  });

  return {
    streaks: data,
    isLoading,
  };
}
