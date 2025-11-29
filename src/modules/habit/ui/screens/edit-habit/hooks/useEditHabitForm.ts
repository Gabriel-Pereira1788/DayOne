import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  habitSchema,
  HabitSchema,
} from "../../../components/habit-form/library/habit-schema";
import { IconProps } from "@/shared/ui";

type Props = {
  onSubmit: (data: HabitSchema) => void;
  initialData: HabitSchema;
};
export function useEditHabitForm({ onSubmit, initialData }: Props) {
  const { control, handleSubmit, watch, setValue, getValues,formState } =
    useForm<HabitSchema>({
      defaultValues: initialData,
      mode: "onChange",
      resolver: zodResolver(habitSchema),
    });

  function handleSetIconValue(icon: IconProps["iconName"]) {
    setValue("icon", icon);
  }

  function handleClearDays() {
    setValue("dayOfMonth", undefined);
    setValue("dayOfWeek", undefined);
  }

  function handleChangeTime(time: string) {
    setValue("time", time);
  }

  return {
    control,
    getValues,
    watch,
    handleSetIconValue,
    handleClearDays,
    handleChangeTime,
    setValue,
    onSubmit: handleSubmit(onSubmit),
  };
}
