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

  const { control, onSubmit, setValue } = useEditHabitForm({
    onSubmit: handleSubmit,
    initialData: {
      title: habit.title,
      icon: habit.icon,
      description: habit.description || "",
      targetDurationInDays: habit.targetDurationInDays?.toString() || "",
    },
  });

  function handleSubmit(data: HabitSchema) {
    editHabit({
      id: habit.id,

      body: {
        title: data.title,
        icon: data.icon,
        description: data.description,
        targetDurationInDays: Number(data.targetDurationInDays),
      },
    });
  }

  function handleSetIconValue(icon: IconProps["iconName"]) {
    setValue("icon", icon);
  }

  return {
    control,
    handleSetIconValue,
    onSubmit,
    isPending,
  };
}
