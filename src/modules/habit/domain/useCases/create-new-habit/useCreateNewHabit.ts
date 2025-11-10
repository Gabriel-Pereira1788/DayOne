import { MutationProps } from "@/infra/types";
import { useMutation } from "@tanstack/react-query";
import { Habit, HabitDTO } from "../../habit.model";
import { createNewHabitService } from "./create-new-habit.service";

export function useCreateNewHabit(config: MutationProps<Habit>) {
  const { mutate, isPending } = useMutation<Habit, Error, HabitDTO>({
    mutationFn: (variables) => createNewHabitService(variables),
    onSuccess: (data) => {
      config.onSuccess?.(data);
    },
    onError: (error) => {
      config.onError?.(error);
    },
  });

  return { createNewHabit: mutate, isPending };
}
