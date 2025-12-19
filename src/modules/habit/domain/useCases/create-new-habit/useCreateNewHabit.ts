import { MutationProps } from "@/infra/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Habit, HabitDTO } from "../../habit.model";
import { createNewHabitService } from "./create-new-habit.service";
import { HabitQueryKeys } from "@/modules/habit/types";
import { useRepository } from "@/infra/repository/hooks/useRepository";
import { useScheduleNotification } from "@/infra/adapters/schedule-notification/hooks/useScheduleNotification";

export function useCreateNewHabit(config: MutationProps<Habit>) {
  const queryClient = useQueryClient();
  const repositoryService = useRepository();
  const scheduleNotification = useScheduleNotification();

  const { mutate, isPending } = useMutation<Habit, Error, HabitDTO>({
    mutationFn: (variables) =>
      createNewHabitService(variables, repositoryService),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [HabitQueryKeys.GET_HABITS],
      });
      scheduleNotification.schedule(
        data.frequency,
        {
          id: data.id,
          title: data.title,
          message: "Did you get this done today?",
        },
        {
          hour: data.hours,
          minute: data.minutes,
          dayOfMonth: data.dayOfMonth,
          dayOfWeek: data.dayOfWeek,
        },
      );
      config.onSuccess?.(data);
    },
    onError: (error) => {
      config.onError?.(error);
    },
  });

  return { createNewHabit: mutate, isPending };
}
