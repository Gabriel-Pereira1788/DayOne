import { Box, Card, Text, Icon } from "@/shared/ui";
import { IconPress } from "@/shared/ui/Icon";
import { StreakCalendarProps } from "./types";
import { dimensions } from "@/shared/helpers";
import { CalendarDay } from "./components";
import { useStreakCalendarController } from "./streak-calendar.controller";
import { ActivityIndicator } from "react-native";

const MONTH_NAMES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export function StreakCalendar({ habitId, habitIcon }: StreakCalendarProps) {
  const controller = useStreakCalendarController({
    habitId,
  });

  if (controller.isLoading) {
    return (
      <Card
        width={dimensions.width - 40}
        height={300}
        padding="sp16"
        alignItems="center"
        justifyContent="center"
      >
        <ActivityIndicator size={"large"} color="#ddd" />
      </Card>
    );
  }

  const monthName = MONTH_NAMES[controller.currentDate.getMonth()];
  const year = controller.currentDate.getFullYear();

  const renderCalendarDays = () => {
    const rows = [];
    for (let i = 0; i < controller.monthlyData.days.length; i += 7) {
      const week = controller.monthlyData.days.slice(i, i + 7);
      rows.push(
        <Box key={i} flexDirection="row">
          {week.map((day, dayIndex) => (
            <CalendarDay key={dayIndex} day={day} habitIcon={habitIcon} />
          ))}
        </Box>,
      );
    }
    return rows;
  };

  return (
    <Card
      width={dimensions.width - 10}
      borderWidth={0}
      backgroundColor="backgroundPrimary"
      gap="sp16"
    >
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <IconPress
          iconName="arrowLeft"
          onPress={controller.handlePreviousMonth}
          size={24}
        />

        <Box alignItems="center" flex={1}>
          <Text
            text={`${monthName} ${year}`}
            preset="semiBold/16"
            color="textPrimary"
          />
        </Box>

        <IconPress
          iconName="arrowRight"
          onPress={controller.handleNextMonth}
          size={24}
        />
      </Box>

      {/*{renderWeekDays()}*/}

      <Box gap="sp3">{renderCalendarDays()}</Box>
    </Card>
  );
}
