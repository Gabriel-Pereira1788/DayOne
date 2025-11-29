import React from "react";

import { Card, Box, Text, Badge, BoxProps, Icon, IconProps } from "@/shared/ui";
import { Habit } from "@/modules/habit/domain/habit.model";

interface HabitCardProps {
  habit: Habit;
}

export function HabitCard({ habit }: HabitCardProps) {
  const { title, description, completed, targetDurationInDays } = habit;

  return (
    <Card
      flexDirection="row"
      opacity={completed ? 0.6 : 1}
      flex={1}
      px="sp10"
      borderLeftWidth={4}
      borderLeftColor={"textPrimary"}
    >
      {habit.icon && (
        <Box
          width={60}
          height={60}
          alignSelf="center"
          borderWidth={1}
          borderColor="surfaceBorder"
          borderRadius="rd100"
          alignItems="center"
          justifyContent="center"
        >
          <Icon
            iconName={habit.icon as IconProps["iconName"]}
            size={40}
            color="textPrimary"
          />
        </Box>
      )}
      {/* Header Section */}
      <Box flex={2} px="sp12">
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-start"
          marginBottom="sp12"
        >
          <Box flex={1} marginRight="sp12">
            <Text
              preset="semiBold/16"
              text={title}
              color={completed ? "textTertiary" : "textPrimary"}
              numberOfLines={1}
            />
          </Box>
        </Box>

        {/* Description Section */}
        {description && (
          <Text
            preset="regular/14"
            text={description}
            color="textSecondary"
            numberOfLines={2}
          />
        )}

        {/* Footer Section */}
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginTop="sp12"
        >
          {targetDurationInDays && (
            <Text
              preset="regular/10"
              text={`${targetDurationInDays} days`}
              color={completed ? "textTertiary" : "textSecondary"}
            />
          )}

          {completed && (
            <Text
              preset="medium/10"
              text="✓ Completo"
              color="feedbackSuccess"
            />
          )}
        </Box>
      </Box>
    </Card>
  );
}
