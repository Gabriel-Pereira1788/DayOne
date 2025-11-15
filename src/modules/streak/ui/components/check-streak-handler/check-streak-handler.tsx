import { CheckStreakHandlerProps } from "./types";
import { Box, Icon, Text, Button } from "@/shared/ui";
import { ActivityIndicator } from "react-native";

import { palette } from "@/styles";

import { useCheckStreakHandlerController } from "./check-streak-handler.controller";

export function CheckStreakHandler({
  habitId,
  habitTitle,
}: CheckStreakHandlerProps) {
  const controller = useCheckStreakHandlerController({
    habitId,
  });

  if (controller.isPending) {
    return (
      <Box
        flex={1}
        alignItems="center"
        justifyContent="center"
        gap="sp20"
        paddingHorizontal="sp25"
      >
        {/*<Icon iconName="lightBulb" size={48} color="feedbackWarning" />*/}
        <Text text={habitTitle} preset="bold/30" />
        <ActivityIndicator size="large" color={palette.surface.border} />
        <Text
          text="Preparing your habit streak..."
          preset="medium/16"
          color="textSecondary"
        />
        <Text
          text={controller.motivationalQuote}
          preset="regular/14"
          color="textTertiary"
        />
      </Box>
    );
  }

  return (
    <Box
      flex={1}
      alignItems="center"
      justifyContent="center"
      gap="sp25"
      paddingHorizontal="sp25"
    >
      {/*<Icon iconName="barbell" size={56} color="buttonPrimaryBackground" />*/}
      <Text text={habitTitle} preset="bold/30" />

      <Box alignItems="center" gap="sp15">
        <Text
          text="Ready to build your streak?"
          preset="medium/16"
          color="textPrimary"
        />
        <Text
          text={controller.motivationalQuote}
          preset="regular/14"
          color="textTertiary"
        />
      </Box>

      <Box width="100%" paddingTop="sp20">
        <Button
          text={"Mark as Complete"}
          onPress={controller.handleCheckHabit}
          loading={controller.isPending}
          rightIconName={controller.isPending ? undefined : "check"}
          variant="filled"
        />
      </Box>
    </Box>
  );
}
