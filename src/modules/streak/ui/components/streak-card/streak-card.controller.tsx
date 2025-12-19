import { useGetStreaks } from "@/modules/streak/domain/useCases/get-streaks";
import { useWeeklyStreakData } from "./hooks";
import { modalService } from "@/shared/services/modal";
import { CheckStreakHandler } from "../check-streak-handler";
import { useEffect } from "react";
import { StreakCardProps } from "./types";
import { useScheduleNotification } from "@/infra/adapters/schedule-notification/hooks/useScheduleNotification";

export function useStreakCardController({
  habitId,
  habitTitle,
  habitIcon,
}: StreakCardProps) {
  const { streaks, isLoading } = useGetStreaks(habitId);
  const scheduleNotification = useScheduleNotification();
  const weekData = useWeeklyStreakData({ streakData: streaks });

  function openCheckHandler() {
    modalService.open({
      content: (
        <CheckStreakHandler
          habitTitle={habitTitle}
          habitId={habitId}
          habitIcon={habitIcon}
        />
      ),
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
