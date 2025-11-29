import { Control } from "react-hook-form";
import { HabitSchema } from "../../library/habit-schema";

export interface FrequencySelectorProps {
  control: Control<HabitSchema>;
  handleClearDays: () => void;
}
