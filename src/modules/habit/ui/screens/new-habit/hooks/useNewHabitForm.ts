import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  habitSchema,
  HabitSchema,
} from "../../../components/habit-form/library/habit-schema";
import { IconProps } from "@/shared/ui";

type Props = {
  onSubmit: (data: HabitSchema) => void;
};
export function useNewHabitForm({ onSubmit }: Props) {
  const { control, handleSubmit, watch, setValue, getValues } =
    useForm<HabitSchema>({
      defaultValues: {
        title: "",
        time: "11:11",
        description: "",
        targetDurationInDays: "30",
      },
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
    watch,
    handleSetIconValue,
    handleClearDays,
    handleChangeTime,
    getValues,
    setValue,
    onSubmit: handleSubmit(onSubmit),
  };
}
