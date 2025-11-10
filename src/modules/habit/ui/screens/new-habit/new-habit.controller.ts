import { useCreateNewHabit } from "@/modules/habit/domain/useCases/create-new-habit";
import { HabitDTO } from "@/modules/habit/domain/habit.model";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { useNewHabitForm } from "./hooks/useNewHabitForm";
import { NewHabitSchema } from "./library/new-habit-schema";
import { Alert } from "react-native";

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

  function handleSubmit(data: NewHabitSchema) {
    createNewHabit({
      ...data,
      targetDurationInDays: parseInt(data.targetDurationInDays),
    });
  }

  function handleSetIconValue(icon: string) {
    setValue("icon", icon);
  }

  return {
    control,
    handleSetIconValue,
    onSubmit,
    isPending,
  };
}
