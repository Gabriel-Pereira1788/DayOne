import {
  Box,
  Card,
  FormInput,
  Icon,
  Text,
  TouchableOpacityBox,
} from "@/shared/ui";
import { FrequencySelector } from "./components/frequency-selector";
import { HabitFormProps } from "./types";
import { TimePicker } from "@/shared/ui/TimePicker";
import { modalService } from "@/shared/services/modal";

export function HabitForm({
  control,
  handleClearDays,
  getValues,
  handleChangeTime,
}: HabitFormProps) {
  function onOpenTimePicker() {
    const time = getValues("time");
    const [hour, minute] = time.split(":").map(Number);

    modalService.open({
      content: (
        <TimePicker
          initialHour={hour}
          initialMinute={minute}
          onConfirm={(hour, minute) => {
            handleChangeTime(
              `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
            );
          }}
        />
      ),
    });
  }
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

      <FrequencySelector control={control} handleClearDays={handleClearDays} />
      <Box gap="sp10" mt="sp10">
        <Text
          preset="semiBold/14"
          text="Set Time to schedule"
          color="textPrimary"
        />

        <TouchableOpacityBox
          testID="time-input-field"
          activeOpacity={0.8}
          onPress={onOpenTimePicker}
          boxProps={{
            flexDirection: "row",
            gap: "sp10",
            alignItems: "center",
          }}
        >
          <FormInput
            control={control}
            name="time"
            editable={false}
            pointerEvents="none"
            leftIconProps={{
              iconName: "clock",
            }}
            placeholder="11:11"
          />
        </TouchableOpacityBox>
      </Box>
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
