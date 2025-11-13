import { MutationProps } from "@/infra/types";
import { Habit, HabitDTO, HabitId } from "../../habit.model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editHabitService } from "./edit-habit.service";
import { HabitQueryKeys } from "@/modules/habit/types";

export function useEditHabit(props: MutationProps<Habit>) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation<
    Habit,
    Error,
    { id: HabitId; body: Partial<HabitDTO> }
  >({
    mutationFn: (variables) => editHabitService(variables.id, variables.body),
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: [HabitQueryKeys.GET_HABIT_DETAILS, result.id],
      });
      queryClient.invalidateQueries({
        queryKey: [HabitQueryKeys.GET_HABITS],
      });
      props.onSuccess?.();
    },
    onError: (error) => {
      props.onError?.(error);
    },
  });

  return {
    editHabit: mutate,
    isPending,
  };
}
