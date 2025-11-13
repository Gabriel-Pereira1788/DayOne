import React from "react";
import { Box, Button } from "@/shared/ui";
import { useNewHabitController } from "./new-habit.controller";

import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import { NewHabitHeader } from "./components/new-habit-header";
import { HabitForm } from "../../components/habit-form";
import { HabitIconSelection } from "../../components/habit-icon-selection";

export function NewHabitScreen() {
  const controller = useNewHabitController();

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <HabitIconSelection onChangeIcon={controller.handleSetIconValue} />
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
