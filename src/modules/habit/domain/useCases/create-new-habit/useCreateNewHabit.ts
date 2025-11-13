import { MutationProps} from "@/infra/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Habit, HabitDTO } from "../../habit.model";
import { createNewHabitService } from "./create-new-habit.service";
import { HabitQueryKeys } from "@/modules/habit/types";

export function useCreateNewHabit(config: MutationProps<Habit>) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation<Habit, Error, HabitDTO>({
    mutationFn: (variables) => createNewHabitService(variables),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [HabitQueryKeys.GET_HABITS],
      });
      config.onSuccess?.(data);
    },
    onError: (error) => {
      config.onError?.(error);
    },
  });

  return { createNewHabit: mutate, isPending };
}
