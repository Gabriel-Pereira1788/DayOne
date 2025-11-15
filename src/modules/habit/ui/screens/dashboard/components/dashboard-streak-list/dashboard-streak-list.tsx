import { StreakList } from "@/modules/streak/ui/components/streak-list";
import { useDashboardStreakListController } from "./dashboard-streak-list.controller";
import { ActivityIndicator } from "react-native";
import { Box } from "@/shared/ui";
import { DashboardHeader } from "../dashboard-header";

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
      <DashboardHeader />
      <StreakList habits={controller.habits || []} />
    </Box>
  );
}
