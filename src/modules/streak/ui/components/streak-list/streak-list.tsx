import { Box, IconProps } from "@/shared/ui";
import { StreakListProps } from "./types";
import { FlatList } from "react-native";
import { dimensions } from "@/shared/helpers";
import { StreakCard } from "../streak-card";

const ITEM_WIDTH = dimensions.width + 20;
export function StreakList({ habits }: StreakListProps) {
  return (
    <Box width={"100%"} gap="sp10" mb="sp10">
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
    </Box>
  );
}
