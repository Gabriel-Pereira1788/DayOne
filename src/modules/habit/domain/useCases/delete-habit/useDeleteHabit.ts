import { MutationProps } from "@/infra/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteHabitService } from "./delete-habit.service";
import { HabitQueryKeys } from "@/modules/habit/types";

export function useDeleteHabit(props: MutationProps<void>) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation<void, Error, { id: string }>({
    mutationFn: (variables) => deleteHabitService(variables.id),
    onSuccess: () => {
      props.onSuccess?.();
      queryClient.invalidateQueries({
        queryKey: [HabitQueryKeys.GET_HABITS],
      });
    },
    onError: (error) => {
      props.onError?.(error);
    },
  });

  return {
    deleteHabit: mutate,
    isPending,
  };
}
