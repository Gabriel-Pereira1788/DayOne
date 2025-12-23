import { Box, Text } from "@/shared/ui";
import { AIMessageDataRenderProps } from "./types";
import { TouchableBounce } from "@/shared/ui/Touchable";
import { FadeInDown, FadeInLeft } from "react-native-reanimated";
import { router } from "expo-router";
import { HabitCard } from "@/modules/habit/ui/components/habit-card";
import { modalService } from "@/shared/services/modal";
import { useCallback } from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import { Habit } from "@/modules/habit/domain/habit.model";
import Animated from "react-native-reanimated";

export function AIMessageDataRender({
  habitData,
  messageContent,
}: AIMessageDataRenderProps) {
  function handlePress(habitId: string) {
    modalService.hide();
    router.push(`/habit-details/${habitId}`);
  }

  const renderItem = useCallback(
    ({ item: habit }: ListRenderItemInfo<Habit>) => {
      return (
        <TouchableBounce
          entering={FadeInDown}
          key={habit.id}
          boxProps={{
            width: "100%",
          }}
          testID="ai-habit-card"
          onPress={() => handlePress(habit.id)}
        >
          <HabitCard habit={habit} />
        </TouchableBounce>
      );
    },
    [],
  );

  return (
    <FlatList
      ListHeaderComponent={
        <Animated.View entering={FadeInLeft}>
          <Text
            preset="regular/16"
            text={messageContent}
            color="textSecondary"
          />
        </Animated.View>
      }
      style={{
        width: "100%",
      }}
      contentContainerStyle={{
        gap: 10,
      }}
      data={habitData}
      renderItem={renderItem}
    />
  );
}
