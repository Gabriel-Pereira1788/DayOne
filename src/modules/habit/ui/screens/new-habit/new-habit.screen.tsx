import React from "react";
import { Box, Button } from "@/shared/ui";
import { useNewHabitController } from "./new-habit.controller";

import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import { NewHabitHeader } from "./components/new-habit-header";
import { NewHabitForm } from "./components/new-habit-form";
import { NewHabitIconSelection } from "./components/new-habit-icon-selection";

export function NewHabitScreen() {
  const controller = useNewHabitController();

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <NewHabitIconSelection onChangeIcon={controller.handleSetIconValue} />
      <NewHabitHeader />

      <NewHabitForm control={controller.control} />

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
