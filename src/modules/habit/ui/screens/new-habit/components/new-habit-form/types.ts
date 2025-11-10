import { Control } from "react-hook-form";
import { NewHabitSchema } from "../../library/new-habit-schema";

export interface NewHabitFormProps {
  control: Control<NewHabitSchema>;
}
