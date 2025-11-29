import { useCreateNewHabit } from "@/modules/habit/domain/useCases/create-new-habit";

import { router } from "expo-router";

import { useNewHabitForm } from "./hooks/useNewHabitForm";

import { Alert } from "react-native";
import { HabitSchema } from "../../components/habit-form/library/habit-schema";

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

  const {
    control,
    onSubmit,
    setValue,
    getValues,
    handleChangeTime,
    handleClearDays,
    handleSetIconValue,
  } = useNewHabitForm({
    onSubmit: handleSubmit,
  });

  function handleSubmit(data: HabitSchema) {
    const [hours, minutes] = data.time.split(":");
    createNewHabit({
      ...data,
      hours: parseInt(hours),
      minutes: parseInt(minutes),
      targetDurationInDays: parseInt(data.targetDurationInDays),
    });
  }

  function close() {
    router.back();
  }

  return {
    control,
    handleChangeTime,
    handleClearDays,
    handleSetIconValue,
    onSubmit,
    isPending,
    close,
    getValues,
  };
}
