import { useCreateStreak } from "@/modules/streak/domain/useCases/create-streak";
import { CheckStreakHandlerProps } from "./types";
import { Box, Icon, Text, Button } from "@/shared/ui";
import { ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { palette } from "@/styles";
import { modalService } from "@/shared/services/modal";

const inspirationalQuotes = [
  "Every day is a new chance to build better habits!",
  "Small steps lead to big changes.",
  "Consistency is the key to transformation.",
  "Today's effort is tomorrow's strength.",
  "You're building the best version of yourself!",
  "Progress, not perfection.",
  "One habit at a time, one day at a time.",
];

const getRandomQuote = () =>
  inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];

export function CheckStreakHandler({
  habitId,
  habitTitle,
}: CheckStreakHandlerProps) {
  const [motivationalQuote, setMotivationalQuote] = useState(getRandomQuote());

  const { createStreak, isPending } = useCreateStreak({
    onSuccess: () => {
      modalService.hide();
    },
  });

  const handleCheckHabit = () => {
    setMotivationalQuote(getRandomQuote());
    createStreak({
      habitId: habitId,
    });
  };

  if (isPending) {
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
          text={motivationalQuote}
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
          text={motivationalQuote}
          preset="regular/14"
          color="textTertiary"
        />
      </Box>

      <Box width="100%" paddingTop="sp20">
        <Button
          text={isPending ? "Marking Complete..." : "Mark as Complete"}
          onPress={handleCheckHabit}
          loading={isPending}
          rightIconName={isPending ? undefined : "check"}
          variant="filled"
        />
      </Box>
    </Box>
  );
}
