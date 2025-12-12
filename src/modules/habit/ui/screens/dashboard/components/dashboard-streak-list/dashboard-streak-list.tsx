import { StreakList } from "@/modules/streak/ui/components/streak-list";
import { useDashboardStreakListController } from "./dashboard-streak-list.controller";
import { ActivityIndicator } from "react-native";
import { Box, Text } from "@/shared/ui";

export function DashboardStreakList() {
  const controller = useDashboardStreakListController();

  if (controller.isLoading) {
    return (
      <Box width={"100%"}>
        <ActivityIndicator />
      </Box>
    );
  }
  return (
    <Box>
      <Box px="sp20" marginVertical="sp12">
        <Text text="Streaks" preset="semiBold/24" />
      </Box>
      <StreakList habits={controller.habits || []} />
    </Box>
  );
}
