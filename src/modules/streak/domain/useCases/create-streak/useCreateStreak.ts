import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStreakService } from "./create-streak.service";
import { Streak } from "../../streak.model";
import { MutationProps } from "@/infra/types";
import { StreaksQueryKeys } from "@/modules/streak/types";
import { useRepository } from "@/infra/repository/hooks/useRepository";

export function useCreateStreak(config: MutationProps<Streak>) {
  const queryClient = useQueryClient();
  const repositoryService = useRepository();
  const { mutate, isPending } = useMutation<Streak, Error, { habitId: string }>(
    {
      mutationFn: (variables) =>
        createStreakService(variables.habitId, repositoryService),

      onSuccess: (data) => {
        config.onSuccess?.(data);
        queryClient.invalidateQueries({
          queryKey: [StreaksQueryKeys.GET_STREAKS],
        });
      },
      onError: (error) => {
        config.onError?.(error);
      },
    },
  );

  return {
    createStreak: mutate,
    isPending,
  };
}
