import { Box } from "@/shared/ui";
import { useDashboardController } from "./dashboard.controller";

import { FlatList, ListRenderItemInfo } from "react-native";
import { habitListMock } from "@/modules/habit/__mocks__/habit-list.mock";
import { HabitCard } from "../../components/habit-card";
import { useCallback } from "react";
import { Habit } from "@/modules/habit/domain/habit.model";
import { TouchableBounce } from "@/shared/ui/Touchable";
import { DashboardEmptyView } from "./components/dashboard-empty-view/dashboard-empty-view";
import { DashboardHeader } from "./components/dashboard-header";

export function DashboardScreen() {
  const controller = useDashboardController();

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Habit>) => (
      <TouchableBounce
        boxProps={{
          marginHorizontal: "sp20",
        }}
      >
        <HabitCard habit={item} />
      </TouchableBounce>
    ),
    [],
  );

  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <FlatList
        data={controller.habits}
        ListEmptyComponent={<DashboardEmptyView />}
        ListHeaderComponent={
          <DashboardHeader habits={controller.habits || []} />
        }
        style={{
          width: "100%",
        }}
        contentContainerStyle={{
          flexGrow: 1,
          gap: 10,
          paddingBottom:30
        }}
        renderItem={renderItem}
      />
    </Box>
  );
}
