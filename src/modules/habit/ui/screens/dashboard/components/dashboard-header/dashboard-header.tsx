import { streakListMock } from "@/modules/streak/__mocks__/streak-list.mock";
import { StreakCard } from "@/modules/streak/ui/components/streak-card";
import { dimensions } from "@/shared/helpers";
import { Box, Button, IconProps, Text } from "@/shared/ui";
import { router } from "expo-router";
import { FlatList } from "react-native";
import { DashboardHeaderProps } from "./types";
import { IconPress } from "@/shared/ui/Icon";

const ITEM_WIDTH = dimensions.width - 20;
export function DashboardHeader({ habits }: DashboardHeaderProps) {

  return (
    <Box width={"100%"} gap="sp10" mb="sp10">
      <Box
        flexDirection="row"
        width={"100%"}
        gap="sp20"
        px="sp20"
        alignItems="center"
        justifyContent="flex-end"
      >

        <IconPress iconName="plus" size={35} weight="bold" onPress={() => {
          router.navigate("/(app)/new-habit")
        }} />
      </Box>

      <Box px="sp20" mt="sp12">
        <Text text="Streaks" preset="semiBold/24" />
      </Box>


      <FlatList
        horizontal
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        getItemLayout={(data, index) => {
          return {
            length: ITEM_WIDTH,
            offset: ITEM_WIDTH * index,
            index,
          };
        }}
        centerContent
        data={habits}
        contentContainerStyle={{
          marginHorizontal: 20,
          gap: 15,
        }}
        renderItem={({ item, index }) => (
          <StreakCard
            habitId={item.id}
            habitTitle={item.title}
            habitIcon={item.icon as IconProps["iconName"]}
          />
        )}
      />

      <Box px="sp20">
        <Text text="Habits" preset="semiBold/24" />
      </Box>
    </Box>
  );
}
