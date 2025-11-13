import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  habitSchema,
  HabitSchema,
} from "../../../components/habit-form/library/habit-schema";

type Props = {
  onSubmit: (data: HabitSchema) => void;
  initialData: HabitSchema;
};
export function useEditHabitForm({ onSubmit, initialData }: Props) {
  const { control, handleSubmit, watch, setValue } = useForm<HabitSchema>({
    defaultValues: initialData,
    mode: "onChange",
    resolver: zodResolver(habitSchema),
  });

  return {
    control,
    watch,
    setValue,
    onSubmit: handleSubmit(onSubmit),
  };
}
