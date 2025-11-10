import React from "react";
import { Box, Text, Icon } from "@/shared/ui";
import { MonthlyDay } from "../hooks/useMonthlyStreakData";
import { IconProps } from "@/shared/ui";

interface CalendarDayProps {
  day: MonthlyDay;
  habitIcon?: IconProps["iconName"];
}

export function CalendarDay({ day, habitIcon }: CalendarDayProps) {
  const renderDayContent = () => {
    if (day.hasStreak && day.isCurrentMonth) {
      return (
        <Box
          width={40}
          height={40}
          borderWidth={2}
          borderRadius="rd100"
          borderColor="surfaceBorder"
          backgroundColor="surfaceSecondary"
          justifyContent="center"
          alignItems="center"
        >
          <Icon iconName={habitIcon || "check"} size={20} />
        </Box>
      );
    }

    if (day.isToday && day.isCurrentMonth) {
      return (
        <Box
          width={40}
          height={40}
          borderWidth={2}
          borderRadius="rd100"
          borderColor="surfaceBorder"
          backgroundColor="surfaceSecondary"
          justifyContent="center"
          alignItems="center"
        >
          <Text text={String(day.dayOfMonth)} preset="medium/14" />
        </Box>
      );
    }

    if (!day.isCurrentMonth) {
      return (
        <Box
          width={40}
          height={40}
          borderRadius="rd8"
          justifyContent="center"
          alignItems="center"
        >
          <Text text={String(day.dayOfMonth)} preset="medium/14" color="textSecondary" />
        </Box>
      );
    }

    return (
      <Box
        width={40}
        height={40}
        borderRadius="rd8"
        justifyContent="center"
        alignItems="center"
      >
        <Text text={String(day.dayOfMonth)} preset="medium/14" />
      </Box>
    );
  };

  return (
    <Box alignItems="center" justifyContent="center" flex={1}>
      {renderDayContent()}
    </Box>
  );
}
