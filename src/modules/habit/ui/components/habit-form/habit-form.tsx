import { Box, Card, FormInput, Icon, Text } from "@/shared/ui";

import { HabitFormProps } from "./types";

export function HabitForm({ control }: HabitFormProps) {
  return (
    <Box gap="sp15">
      <FormInput
        title="Title"
        control={control}
        name="title"
        placeholder="Ex: Exercise physical"

      />

      <FormInput
        control={control}
        title="Description"
        name="description"
        placeholder="Describe your habit in detail"
        multiline
        boxProps={{
          height: 120,
        }}
      />

      <FormInput
        title="Duration (days)"
        control={control}
        name="targetDurationInDays"
        placeholder="30"
        keyboardType="number-pad"
        leftIconProps={{
          iconName: "calendar",
        }}
      />
      <Card
        marginBottom="sp25"
        borderLeftWidth={3}
        borderLeftColor="feedbackInfo"
        flexDirection="row"
        gap="sp12"
        alignItems="flex-start"
      >
        <Icon iconName="lightBulb" color="textSecondary" size={20} />
        <Box flex={1}>
          <Box marginBottom="sp5">
            <Text preset="semiBold/14" text="Tip" color="textPrimary" />
          </Box>
          <Text
            preset="regular/14"
            text="Start with 30 days to create the habit. Consistency is more important than intensity."
            color="textSecondary"
            numberOfLines={3}
          />
        </Box>
      </Card>
    </Box>
  );
}
