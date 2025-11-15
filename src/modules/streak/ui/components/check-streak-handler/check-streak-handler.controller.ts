import { useCreateStreak } from "@/modules/streak/domain/useCases/create-streak";
import { modalService } from "@/shared/services/modal";
import { useState } from "react";
const inspirationalQuotes = [
  "Every day is a new chance to build better habits!",
  "Small steps lead to big changes.",
  "Consistency is the key to transformation.",
  "Today's effort is tomorrow's strength.",
  "You're building the best version of yourself!",
  "Progress, not perfection.",
  "One habit at a time, one day at a time.",
];

const getRandomQuote = () =>
  inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];
type Props = {
  habitId: string;
};

export function useCheckStreakHandlerController({ habitId }: Props) {
  const [motivationalQuote, setMotivationalQuote] = useState(getRandomQuote());

  const { createStreak, isPending } = useCreateStreak({
    onSuccess: () => {
      modalService.hide();
    },
  });

  const handleCheckHabit = () => {
    setMotivationalQuote(getRandomQuote());
    createStreak({
      habitId: habitId,
    });
  };

  return {
    motivationalQuote,
    handleCheckHabit,
    isPending,
  };
}
