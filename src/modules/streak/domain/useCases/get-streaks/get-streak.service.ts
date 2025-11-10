import { Collection } from "@/infra/repository";
import { repositoryService } from "@/shared/services/repository";
import { Streak, StreakData } from "../../streak.model";
import { streakListMock } from "@/modules/streak/__mocks__/streak-list.mock";

export async function getStreakService(habitId: string): Promise<StreakData> {
  const streaksRepository = repositoryService.collection<Streak>(
    Collection.STREAKS,
  );

  const streaks = await streaksRepository.findBy({
    habitId,
  });

  // const streaks = streakListMock;

  if (!streaks || streaks.length === 0) {
    return {
      habitId,
      currentStreak: 0,
      longestStreak: 0,
      completedDates: [],
      isActiveToday: false,
    };
  }

  // Converte createdAt para Date e ordena por data
  const completedDates = streaks
    .filter((streak) => streak.createdAt)
    .map((streak) => new Date(streak.createdAt!))
    .sort((a, b) => a.getTime() - b.getTime());

  // Remove duplicatas do mesmo dia
  const uniqueDates = removeDuplicateDays(completedDates);

  // Calcula streak atual e maior streak
  const currentStreak = calculateCurrentStreak(uniqueDates);
  const longestStreak = calculateLongestStreak(uniqueDates);
  const isActiveToday = isCompletedToday(uniqueDates);

  console.log("CURRENT-STREAK", currentStreak);
  console.log("LONGEST-STREAK", longestStreak);
  console.log("IS-ACTIVE-TODAY", isActiveToday);

  return {
    habitId,
    currentStreak,
    longestStreak,
    completedDates: uniqueDates,
    isActiveToday,
  };
}

function removeDuplicateDays(dates: Date[]): Date[] {
  const uniqueDatesMap = new Map<string, Date>();

  dates.forEach((date) => {
    const dateKey = formatDateKey(date);
    if (!uniqueDatesMap.has(dateKey)) {
      uniqueDatesMap.set(dateKey, date);
    }
  });

  return Array.from(uniqueDatesMap.values()).sort(
    (a, b) => a.getTime() - b.getTime(),
  );
}

function formatDateKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function calculateCurrentStreak(dates: Date[]): number {
  if (dates.length === 0) return 0;

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Verifica se o streak está ativo (completado hoje ou ontem)
  const lastDate = dates[dates.length - 1];
  const isStreakActive =
    isSameDay(lastDate, today) || isSameDay(lastDate, yesterday);

  // if (!isStreakActive) return 0;

  // Conta dias consecutivos de trás para frente
  let streak = 1;
  let currentDate = new Date(lastDate);

  for (let i = dates.length - 2; i >= 0; i--) {
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() - 1);

    if (isSameDay(dates[i], previousDate)) {
      streak++;
      currentDate = dates[i];
    } else {
      break;
    }
  }

  return streak;
}

function calculateLongestStreak(dates: Date[]): number {
  if (dates.length === 0) return 0;
  if (dates.length === 1) return 1;

  let longestStreak = 1;
  let currentStreakLength = 1;

  for (let i = 1; i < dates.length; i++) {
    const currentDate = dates[i];
    const previousDate = dates[i - 1];

    // Verifica se são dias consecutivos
    const expectedPreviousDate = new Date(currentDate);
    expectedPreviousDate.setDate(currentDate.getDate() - 1);

    if (isSameDay(previousDate, expectedPreviousDate)) {
      currentStreakLength++;
    } else {
      longestStreak = Math.max(longestStreak, currentStreakLength);
      currentStreakLength = 1;
    }
  }

  return Math.max(longestStreak, currentStreakLength);
}

function isCompletedToday(dates: Date[]): boolean {
  if (dates.length === 0) return false;

  const today = new Date();
  const lastDate = dates[dates.length - 1];

  return isSameDay(lastDate, today);
}

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
