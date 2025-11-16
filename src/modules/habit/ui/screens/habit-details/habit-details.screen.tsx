import { Box, Icon, IconProps, Text } from "@/shared/ui";
import { useHabitDetailsController } from "./habit-details.controller";
import { ActivityIndicator } from "react-native";
import { StreakCalendar } from "@/modules/streak/ui/components/streak-calendar";
import { IconPress } from "@/shared/ui/Icon";

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
      <Box
        width={"100%"}
        flexDirection="row"
        alignItems="flex-start"
        justifyContent="space-between"
        px="sp10"
      >
        {controller.habit && (
          <Box alignItems="flex-start" gap="sp10" width={"80%"}>
            {controller.habit.icon && (
              <Icon
                testID="habit-icon-element"
                iconName={controller.habit.icon}
                size={50}
              />
            )}
            <Text text={controller.habit?.title || ""} preset="bold/40" />
            <Text
              text={controller.habit?.description || ""}
              preset="medium/14"
              color="textSecondary"
            />
          </Box>
        )}

        <Box flexDirection="row" gap="sp10">
          <IconPress
            testID="edit-habit-button"
            tintColor="feedbackInfo"
            variant="transparent"
            onPress={controller.redirectToEditHabit}
            iconName="pencil"
            size={30}
          />
          <IconPress
            testID="delete-habit-button"
            tintColor="feedbackError"
            variant="transparent"
            onPress={controller.openDeleteModal}
            iconName="trash"
            size={30}
          />
        </Box>
      </Box>
      {controller.habit && (
        <StreakCalendar
          habitId={controller.habit.id}
          habitIcon={controller.habit.icon as IconProps["iconName"]}
        />
      )}
    </Box>
  );
}
