import type { IconProps } from "@/shared/ui";
import type { HabitId } from "@/modules/habit/domain/habit.model";
import type { HabitSchema } from "../../components/habit-form/library/habit-schema";
import { useEditHabitForm } from "./hooks/useEditHabitForm";
import { useEditHabit } from "@/modules/habit/domain/useCases/edit-habit";
import { router } from "expo-router";

type Props = {
  habit: HabitSchema & { id: HabitId };
};
export function useEditHabitController({ habit }: Props) {
  const { editHabit, isPending } = useEditHabit({
    onSuccess: () => {
      router.back();
    },
  });

  const {
    control,
    onSubmit,
    handleChangeTime,
    handleClearDays,
    handleSetIconValue,
    getValues,
  } = useEditHabitForm({
    onSubmit: handleSubmit,
    initialData: {
      title: habit.title,
      icon: habit.icon,
      frequency: habit.frequency,
      time: habit.time,
      dayOfMonth: habit.dayOfMonth,
      dayOfWeek: habit.dayOfWeek,
      description: habit.description || "",
      targetDurationInDays: habit.targetDurationInDays?.toString() || "",
    },
  });

  function handleSubmit(data: HabitSchema) {
    const [hours, minutes] = data.time.split(":").map(Number);
    editHabit({
      id: habit.id,

      body: {
        title: data.title,
        icon: data.icon,
        dayOfMonth: data.dayOfMonth,
        dayOfWeek: data.dayOfWeek,
        frequency: data.frequency,
        hours: hours,
        minutes: minutes,
        description: data.description,
        targetDurationInDays: Number(data.targetDurationInDays),
      },
    });
  }

  return {
    handleChangeTime,
    handleClearDays,
    handleSetIconValue,
    control,
    getValues,

    onSubmit,
    isPending,
  };
}
