import { Card } from "@/shared/ui";
import { HabitResumeCardProps } from "./types";

export function HabitResumeCard({ habit }: HabitResumeCardProps) {
  const { completed } = habit;
  return (
    <Card
      flexDirection="row"
      opacity={completed ? 0.6 : 1}
      flex={1}
      px="sp10"
    ></Card>
  );
}
