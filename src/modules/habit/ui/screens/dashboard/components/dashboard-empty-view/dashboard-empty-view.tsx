import { Box, Button, Text } from "@/shared/ui";
import { router } from "expo-router";

export function DashboardEmptyView() {
  return (
    <Box
      flex={1}
      alignItems="center"
      justifyContent="center"
      gap="sp10"
      px="sp20"
    >
      <Text
        text="Create a new Habit to start."
        preset="bold/30"
        align="center"
      />
      <Button
        text="New Habit"
        variant="outline"
        enableGradient
        onPress={() => {
          router.navigate("/(app)/new-habit");
        }}
      />
    </Box>
  );
}
