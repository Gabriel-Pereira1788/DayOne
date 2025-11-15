import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { HabitIconSelection } from "../../components/habit-icon-selection";
import { HabitForm } from "../../components/habit-form";
import { Box, Button } from "@/shared/ui";
import { useEditHabitController } from "./edit-habit.controller";
import { useLocalSearchParams } from "expo-router";
import { useGetHabitDetails } from "@/modules/habit/domain/useCases/get-habit-details/useGetHabitDetails";
import { HabitDTO, HabitId } from "@/modules/habit/domain/habit.model";
import { HabitSchema } from "../../components/habit-form/library/habit-schema";

export function EditHabitScreen() {
  const params = useLocalSearchParams<HabitSchema & { id: HabitId }>();

  const controller = useEditHabitController({
    habit: params,
  });

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <HabitIconSelection onChangeIcon={controller.handleSetIconValue} defaultIcon={params.icon} />

      <HabitForm control={controller.control} />

      <Box gap="sp12">
        <Button
          text={"Edit"}
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
