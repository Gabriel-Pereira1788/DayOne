import React from "react";
import { Box, Text, Icon } from "@/shared/ui";
import { WeeklyDay } from "../hooks/useWeeklyStreakData";
import { IconProps } from "@/shared/ui";

interface WeekDayProps {
  day: WeeklyDay;
  habitIcon?: IconProps["iconName"];
}

export function WeekDay({ day, habitIcon }: WeekDayProps) {
  const renderDayContent = () => {
    if (day.hasStreak) {
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
          marginBottom="sp5"
        >
          <Icon iconName={habitIcon || "check"} size={25} />
        </Box>
      );
    }

    return (
      <Box
        width={40}
        height={40}
        borderRadius="rd100"
        justifyContent="center"
        alignItems="center"
        marginBottom="sp5"
        borderWidth={day.isToday ? 2 : 1}
      >
        <Text text={String(day.dayOfMonth)} preset="medium/14" />
      </Box>
    );
  };

  return (
    <Box alignItems="center" flex={1}>
      {renderDayContent()}
      <Text text={day.abbr} preset="regular/10" />
    </Box>
  );
}
