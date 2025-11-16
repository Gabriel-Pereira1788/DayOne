import React from "react";
import { Box, Button } from "@/shared/ui";
import { useNewHabitController } from "./new-habit.controller";

import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import { NewHabitHeader } from "./components/new-habit-header";
import { HabitForm } from "../../components/habit-form";
import { HabitIconSelection } from "../../components/habit-icon-selection";
import { IconPress } from "@/shared/ui/Icon";
import { router } from "expo-router";

export function NewHabitScreen() {
  const controller = useNewHabitController();

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <Box
        width={"100%"}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <HabitIconSelection onChangeIcon={controller.handleSetIconValue} />
        <IconPress
          testID="close-button"
          iconName="x"
          variant="transparent"
          size={40}
          weight="bold"
          tintColor="textSecondary"
          onPress={controller.close}
        />
      </Box>
      <NewHabitHeader />

      <HabitForm control={controller.control} />

      <Box gap="sp12">
        <Button
          text={"Create"}
          variant="filled"
          loading={controller.isPending}
          disabled={controller.isPending}
          enableGradient
          onPress={controller.onSubmit}
        />
      </Box>
    </KeyboardAwareScrollView>
  );
}
