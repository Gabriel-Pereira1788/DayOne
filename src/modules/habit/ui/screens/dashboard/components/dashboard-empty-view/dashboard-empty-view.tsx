import { Box, Button, Text } from "@/shared/ui";
import { router } from "expo-router";

export function DashboardEmptyView() {
  return (
    <Box flex={1} alignItems="center" justifyContent="center" gap="sp10">
      <Text text="Nenhum hábito criado" />
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
