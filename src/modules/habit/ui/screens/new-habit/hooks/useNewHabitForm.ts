import { HabitDTO } from "@/modules/habit/domain/habit.model";
import { useForm } from "react-hook-form";
import { newHabitSchema, NewHabitSchema } from "../library/new-habit-schema";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  onSubmit: (data: NewHabitSchema) => void;
};
export function useNewHabitForm({ onSubmit }: Props) {
  const { control, handleSubmit, watch, setValue } = useForm<NewHabitSchema>({
    defaultValues: {
      title: "",
      description: "",
      icon: "",
      targetDurationInDays: "30",
    },
    mode: "onChange",
    resolver: zodResolver(newHabitSchema),
  });

  return {
    control,
    watch,
    setValue,
    onSubmit: handleSubmit(onSubmit),
  };
}
