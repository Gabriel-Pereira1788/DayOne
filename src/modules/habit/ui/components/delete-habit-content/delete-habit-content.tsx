import { Box, Button, Text } from "@/shared/ui";
import { useDeleteHabitController } from "./delete-habit-content.controller";
import { DeleteHabitContentProps } from "./types";

export function DeleteHabitContent({
  habitId,
  habitTitle,

  onDelete,
}: DeleteHabitContentProps) {
  const controller = useDeleteHabitController({
    habitId,
    onDelete,
  });
  return (
    <Box
      flex={1}
      alignItems="center"
      justifyContent="center"
      gap="sp25"
      paddingHorizontal="sp25"
    >
      <Text text={habitTitle} preset="bold/30" />

      <Box alignItems="center" gap="sp15">
        <Text
          text="Are you sure you want to delete?"
          preset="medium/16"
          color="textPrimary"
        />
      </Box>

      <Box width="100%" paddingTop="sp20">
        <Button
          text={"Delete"}
          onPress={controller.handleDelete}
          loading={controller.isPending}
          variant="filled"
        />
      </Box>
    </Box>
  );
}
