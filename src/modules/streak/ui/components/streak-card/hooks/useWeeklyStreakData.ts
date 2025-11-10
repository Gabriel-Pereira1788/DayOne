import { useMemo } from "react";
import { StreakData } from "@/modules/streak/domain/streak.model";

export interface WeeklyDay {
  abbr: string;
  full: string;
  hasStreak: boolean;
  isToday: boolean;
  date: Date;
  dayOfMonth: number;
}

const DAYS_OF_WEEK = [
  { abbr: "D", full: "Domingo" },
  { abbr: "S", full: "Segunda" },
  { abbr: "T", full: "Terça" },
  { abbr: "Q", full: "Quarta" },
  { abbr: "Q", full: "Quinta" },
  { abbr: "S", full: "Sexta" },
  { abbr: "S", full: "Sábado" },
];

interface UseWeeklyStreakDataProps {
  streakData?: StreakData;
}

export function useWeeklyStreakData({
  streakData,
}: UseWeeklyStreakDataProps): WeeklyDay[] {
  return useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayWeekDay = today.getDay();

    // Calcula o início da semana (domingo)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - todayWeekDay);
    startOfWeek.setHours(0, 0, 0, 0);

    return DAYS_OF_WEEK.map((day, index) => {
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(startOfWeek.getDate() + index);
      currentDate.setHours(0, 0, 0, 0);

      // Verifica se o usuário completou o streak neste dia
      const hasStreak = streakData?.completedDates
        ? streakData.completedDates.some((completedDate) => {
            const completed = new Date(completedDate);

            // console.log(
            //   "COMPLETED",
            //   `${completed.getFullYear()}-${completed.getMonth()}-${completed.getDate()}`,
            //   `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`,
            // );
            return (
              completed.getFullYear() === currentDate.getFullYear() &&
              completed.getMonth() === currentDate.getMonth() &&
              completed.getDate() === currentDate.getDate()
            );
          })
        : false;

      return {
        ...day,
        hasStreak,
        isToday: index === todayWeekDay,
        date: new Date(currentDate),
        dayOfMonth: currentDate.getDate(),
      };
    });
  }, [streakData]);
}
