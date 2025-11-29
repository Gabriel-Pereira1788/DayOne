import { MutationProps } from "@/infra/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteHabitService } from "./delete-habit.service";
import { HabitQueryKeys } from "@/modules/habit/types";
import { scheduleNotification } from "@/shared/services/schedule-notification";

export function useDeleteHabit(props: MutationProps<void>) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation<string, Error, { id: string }>({
    mutationFn: (variables) => deleteHabitService(variables.id),
    onSuccess: (id) => {
      props.onSuccess?.();
      scheduleNotification.cancel(id);
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
