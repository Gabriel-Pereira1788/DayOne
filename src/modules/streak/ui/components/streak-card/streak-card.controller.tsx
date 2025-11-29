import { HabitId } from "@/modules/habit/domain/habit.model";
import { useGetStreaks } from "@/modules/streak/domain/useCases/get-streaks";
import { useWeeklyStreakData } from "./hooks";
import { modalService } from "@/shared/services/modal";
import { CheckStreakHandler } from "../check-streak-handler";
import { useEffect } from "react";
import { scheduleNotification } from "@/shared/services/schedule-notification";

type Props = {
  habitId: HabitId;
  habitTitle: string;
};
export function useStreakCardController({ habitId, habitTitle }: Props) {
  const { streaks, isLoading } = useGetStreaks(habitId);

  const weekData = useWeeklyStreakData({ streakData: streaks });

  function openCheckHandler() {
    modalService.open({
      content: <CheckStreakHandler habitTitle={habitTitle} habitId={habitId} />,
    });
  }

  useEffect(() => {
    const unsubscribe = scheduleNotification.addListener((id) => {
      if (id === habitId) {
        openCheckHandler();
      }
    });

    return unsubscribe;
  }, []);
  return {
    streaks,
    isLoading,
    openCheckHandler,
    weekData,
  };
}
