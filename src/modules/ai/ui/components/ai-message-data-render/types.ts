import { Habit } from "@/modules/habit/domain/habit.model";

export interface AIMessageDataRenderProps {
  habitData: Habit[];
  messageContent: string;
}
