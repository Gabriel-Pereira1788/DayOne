import { Box } from "@/shared/ui";
import { AIMessageDataRenderProps } from "./types";
import { TouchableBounce } from "@/shared/ui/Touchable";
import { FadeInDown } from "react-native-reanimated";
import { router } from "expo-router";
import { HabitCard } from "@/modules/habit/ui/components/habit-card";
import { modalService } from "@/shared/services/modal";

export function AIMessageDataRender({ habitData }: AIMessageDataRenderProps) {
  function handlePress(habitId: string) {
    modalService.hide();
    router.push(`/habit-details/${habitId}`);
  }

  return (
    <Box gap="sp10" width={"100%"}>
      {habitData.map((habit) => (
        <TouchableBounce
          entering={FadeInDown}
          key={habit.id}
          boxProps={{
            width: "100%",
          }}
          testID="habit-card"
          onPress={() => handlePress(habit.id)}
        >
          <HabitCard habit={habit} />
        </TouchableBounce>
      ))}
    </Box>
  );
}
