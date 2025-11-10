import { useMemo } from "react";
import { StreakData } from "@/modules/streak/domain/streak.model";

export interface MonthlyDay {
  date: Date;
  dayOfMonth: number;
  hasStreak: boolean;
  isToday: boolean;
  isCurrentMonth: boolean;
}

interface UseMonthlyStreakDataProps {
  streakData?: StreakData;
  date: Date;
}

const DAYS_OF_WEEK_ABBR = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

export function useMonthlyStreakData({
  streakData,
  date,
}: UseMonthlyStreakDataProps) {
  return useMemo(() => {
    const year = date.getFullYear();
    const month = date.getMonth();

    // Primeiro dia do mês
    const firstDay = new Date(year, month, 1);
    const firstDayOfWeek = firstDay.getDay();

    // Último dia do mês
    const lastDay = new Date(year, month + 1, 0);
    const lastDateOfMonth = lastDay.getDate();

    // Total de células a renderizar (incluindo dias do mês anterior e próximo)
    const totalCells = firstDayOfWeek + lastDateOfMonth;
    const totalRows = Math.ceil(totalCells / 7);

    const days: MonthlyDay[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Adiciona os dias do mês anterior
    const previousMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const dayOfMonth = previousMonthLastDay - i;
      const currentDate = new Date(year, month - 1, dayOfMonth);
      currentDate.setHours(0, 0, 0, 0);

      days.push({
        date: new Date(currentDate),
        dayOfMonth,
        hasStreak: false,
        isToday: false,
        isCurrentMonth: false,
      });
    }

    // Adiciona os dias do mês atual
    for (let dayOfMonth = 1; dayOfMonth <= lastDateOfMonth; dayOfMonth++) {
      const currentDate = new Date(year, month, dayOfMonth);
      currentDate.setHours(0, 0, 0, 0);

      const hasStreak = streakData?.completedDates
        ? streakData.completedDates.some((completedDate) => {
            const completed = new Date(completedDate);
            completed.setHours(0, 0, 0, 0);

            return (
              completed.getFullYear() === currentDate.getFullYear() &&
              completed.getMonth() === currentDate.getMonth() &&
              completed.getDate() === currentDate.getDate()
            );
          })
        : false;

      days.push({
        date: new Date(currentDate),
        dayOfMonth,
        hasStreak,
        isToday:
          currentDate.getFullYear() === today.getFullYear() &&
          currentDate.getMonth() === today.getMonth() &&
          currentDate.getDate() === today.getDate(),
        isCurrentMonth: true,
      });
    }

    // Adiciona os dias do próximo mês
    const remainingCells = totalRows * 7 - days.length;
    for (let dayOfMonth = 1; dayOfMonth <= remainingCells; dayOfMonth++) {
      const currentDate = new Date(year, month + 1, dayOfMonth);
      currentDate.setHours(0, 0, 0, 0);

      days.push({
        date: new Date(currentDate),
        dayOfMonth,
        hasStreak: false,
        isToday: false,
        isCurrentMonth: false,
      });
    }

    return {
      days,
      daysOfWeek: DAYS_OF_WEEK_ABBR,
      month,
      year,
    };
  }, [streakData, date]);
}