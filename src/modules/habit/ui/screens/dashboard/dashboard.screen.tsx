import { Box, Icon, Text, TextInput } from "@/shared/ui";
import { useDashboardController } from "./dashboard.controller";

import { FlatList, ListRenderItemInfo } from "react-native";

import { HabitCard } from "../../components/habit-card";
import { useCallback } from "react";
import { Habit } from "@/modules/habit/domain/habit.model";
import { TouchableBounce } from "@/shared/ui/Touchable";

import { DashboardHeader } from "./components/dashboard-header";
import { StreakList } from "@/modules/streak/ui/components/streak-list";
import { DashboardStreakList } from "./components/dashboard-streak-list";

export function DashboardScreen() {
  const controller = useDashboardController();

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Habit>) => (
      <TouchableBounce
        onPress={() => controller.redirectToHabitDetails(item.id)}
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
      <DashboardStreakList />

      <FlatList
        data={controller.habits}
        ListHeaderComponent={
          <Box px="sp20" gap="sp10">
            <Text text="Habits" preset="semiBold/24" />
            <TextInput
              placeholder="Search"
              LeftElement={<Icon iconName="magnifyingGlass" />}
              onChangeText={controller.handleSearch}
            />
          </Box>
        }
        style={{
          width: "100%",
        }}
        contentContainerStyle={{
          flexGrow: 1,
          gap: 10,
          paddingBottom: 30,
        }}
        renderItem={renderItem}
      />
    </Box>
  );
}
