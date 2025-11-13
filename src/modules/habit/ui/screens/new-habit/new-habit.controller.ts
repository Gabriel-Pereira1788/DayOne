import { useCreateNewHabit } from "@/modules/habit/domain/useCases/create-new-habit";

import { router } from "expo-router";

import { useNewHabitForm } from "./hooks/useNewHabitForm";

import { Alert } from "react-native";
import { HabitSchema } from "../../components/habit-form/library/habit-schema";
import { IconProps } from "@/shared/ui";

export interface NewHabitFormData {
  title: string;
  description: string;
  frequency: "daily" | "weekly" | "custom";
  targetDurationInDays: string;
}

export function useNewHabitController() {
  const { createNewHabit, isPending } = useCreateNewHabit({
    onSuccess: () => {
      router.back();
    },
    onError: (err) => {
      Alert.alert("Error", err.message);
    },
  });

  const { control, onSubmit, setValue } = useNewHabitForm({
    onSubmit: handleSubmit,
  });

  function handleSubmit(data: HabitSchema) {
    createNewHabit({
      ...data,
      targetDurationInDays: parseInt(data.targetDurationInDays),
    });
  }

  function handleSetIconValue(icon: IconProps['iconName']) {
    setValue("icon", icon);
  }

  return {
    control,
    handleSetIconValue,
    onSubmit,
    isPending,
  };
}
