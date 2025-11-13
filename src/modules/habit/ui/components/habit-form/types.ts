import { Control } from "react-hook-form";
import { HabitSchema } from "./library/habit-schema";

export interface HabitFormProps {
  control: Control<HabitSchema>;
}
