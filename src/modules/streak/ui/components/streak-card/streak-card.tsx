import { Box, Card, Text, Icon, Badge, Button } from "@/shared/ui";
import { StreakCardProps } from "./types";
import { dimensions } from "@/shared/helpers";
import { WeekDay } from "./components";
import { TouchableOpacity } from "react-native";
import { useStreakCardController } from "./streak-card.controller";

export function StreakCard({
  habitId,
  habitTitle,
  habitIcon,
}: StreakCardProps) {
  const controller = useStreakCardController({
    habitId,
    habitTitle,
  });

  const renderWeeklyStreak = () => (
    <Box>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        {controller.weekData.length > 0 &&
          controller.weekData.map((day, index) => (
            <WeekDay key={index} day={day} habitIcon={habitIcon} />
          ))}
      </Box>
    </Box>
  );

  if (controller.isLoading) {
    return (
      <Card flexGrow={1} width={dimensions.width - 40} padding="sp16">
        <Text text="Loading..." preset="medium/20" />
      </Card>
    );
  }

  if (
    !controller.isLoading &&
    controller.streaks?.completedDates.length === 0
  ) {
    return (
      <Box width={dimensions.width} justifyContent="center" alignItems="center">
        <Card
          flexGrow={1}
          justifyContent="space-between"
          width={dimensions.width - 40}
          padding="sp16"
          gap="sp10"
          paddingVertical="sp20"
        >
          <Text text={habitTitle} preset="semiBold/24" color="textPrimary" />
          <Text
            text={"Habit not yet verified."}
            preset="medium/20"
            color="textSecondary"
          />
          <Button
            testID={`check-today-${habitId}`}
            text="Check Habit Today"
            onPress={controller.openCheckHandler}
          />
        </Card>
      </Box>
    );
  }

  return (
    <Box width={dimensions.width} justifyContent="center" alignItems="center">
      <Card
        flexGrow={1}
        justifyContent="space-between"
        width={dimensions.width - 40}
        padding="sp16"
        paddingVertical="sp20"
      >
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginBottom="sp16"
        >
          <Box flex={1} gap="sp10">
            <Text
              text={`${controller.streaks?.currentStreak || 0} Straight days`}
              preset="semiBold/24"
              color="textPrimary"
            />
            <Text text={habitTitle} preset="medium/20" color="textSecondary" />
          </Box>

          {!controller.streaks?.isActiveToday && (
            <TouchableOpacity

              activeOpacity={0.8}
              onPress={controller.openCheckHandler}
            >
              <Badge
                text="Check Today"
                textProps={{
                  preset: "semiBold/14",
                  color: "textSecondary",
                }}
              />
            </TouchableOpacity>
          )}
        </Box>

        {renderWeeklyStreak()}
      </Card>
    </Box>
  );
}
