import { MutationProps } from "@/infra/types";
import { Habit, HabitDTO, HabitId } from "../../habit.model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editHabitService } from "./edit-habit.service";
import { HabitQueryKeys } from "@/modules/habit/types";
import { useRepository } from "@/infra/repository/hooks/useRepository";
import { useScheduleNotification } from "@/infra/adapters/schedule-notification/hooks/useScheduleNotification";

export function useEditHabit(props: MutationProps<Habit>) {
  const queryClient = useQueryClient();
  const repositoryService = useRepository();
  const scheduleNotification = useScheduleNotification();

  const { mutate, isPending } = useMutation<
    Habit,
    Error,
    { id: HabitId; body: Partial<HabitDTO> }
  >({
    mutationFn: (variables) =>
      editHabitService(variables.id, variables.body, repositoryService),
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: [HabitQueryKeys.GET_HABIT_DETAILS, result.id],
      });
      queryClient.invalidateQueries({
        queryKey: [HabitQueryKeys.GET_HABITS],
      });

      scheduleNotification.schedule(
        result.frequency,
        {
          id: result.id,
          message: "Did you get this done today?",
          title: result.title,
        },
        {
          hour: result.hours,
          minute: result.minutes,
          dayOfMonth: result.dayOfMonth,
          dayOfWeek: result.dayOfWeek,
        },
      );
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
