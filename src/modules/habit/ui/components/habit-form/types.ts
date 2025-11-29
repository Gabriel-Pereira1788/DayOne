import { Control, UseFormGetValues } from "react-hook-form";
import { HabitSchema } from "./library/habit-schema";

export interface HabitFormProps {
  handleClearDays: () => void;
  handleChangeTime: (time: string) => void;
  getValues: UseFormGetValues<HabitSchema>;
  control: Control<HabitSchema>;
}
