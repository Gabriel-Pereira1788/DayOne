import { Box, Text } from "@/shared/ui";

export function NewHabitHeader() {
  return (
    <Box marginBottom="sp28" gap="sp10">
      <Box>
        <Text preset="semiBold/32" text="New Habit" />
      </Box>
      <Text
        preset="regular/14"
        text="Define your goals and start your journey"
        color="textSecondary"
      />
    </Box>
  );
}
