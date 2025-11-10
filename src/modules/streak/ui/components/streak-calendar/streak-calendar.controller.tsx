import { HabitId } from "@/modules/habit/domain/habit.model";
import { useGetStreaks } from "@/modules/streak/domain/useCases/get-streaks";
import { useMonthlyStreakData } from "./hooks";
import { useState } from "react";

type Props = {
  habitId: HabitId;
};

export function useStreakCalendarController({ habitId }: Props) {
  const { streaks, isLoading } = useGetStreaks(habitId);
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthlyData = useMonthlyStreakData({
    streakData: streaks,
    date: currentDate,
  });

  function handlePreviousMonth() {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  }

  function handleNextMonth() {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  }

  function handleToday() {
    setCurrentDate(new Date());
  }

  const monthName = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
  })
    .format(currentDate)
    .replace(/^\w/, (c) => c.toUpperCase());

  return {
    streaks,
    isLoading,
    monthlyData,
    currentDate,
    monthName,
    handlePreviousMonth,
    handleNextMonth,
    handleToday,
  };
}