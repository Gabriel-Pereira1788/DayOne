import { Box, Icon, IconProps, Text } from "@/shared/ui";

import { useHabitDetailsController } from "./habit-details.controller";
import { ActivityIndicator } from "react-native";
import { StreakCalendar } from "@/modules/streak/ui/components/streak-calendar";

export function HabitDetailsScreen() {
  const controller = useHabitDetailsController();

  if (controller.isLoading) {
    return (
      <Box flex={1} alignItems="center" justifyContent="center">
        <ActivityIndicator size={"large"} color={"#ddd"} />
      </Box>
    );
  }

  return (
    <Box flex={1} alignItems="center" justifyContent="flex-start">
      {controller.habit && (
        <Box width={"100%"} alignItems="flex-start" px="sp10" gap="sp10">
          {controller.habit.icon && (
            <Icon iconName={controller.habit.icon} size={50} />
          )}
          <Text text={controller.habit?.title || ""} preset="bold/40" />
          <Text
            text={controller.habit?.description || ""}
            preset="medium/20"
            color="textSecondary"
          />
        </Box>
      )}
      {controller.habit && (
        <StreakCalendar
          habitId={controller.habit.id}
          habitIcon={controller.habit.icon as IconProps["iconName"]}
        />
      )}
    </Box>
  );
}
