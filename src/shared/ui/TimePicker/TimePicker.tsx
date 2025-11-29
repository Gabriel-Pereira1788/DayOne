import React, { useState, useCallback, useRef } from "react";

import { Box } from "../Box/Box";
import { Text } from "../Text/Text";
import { Button } from "../Button/Button";

import { TimeWheel } from "./TimeWheel";
import type { TimePickerProps } from "./types";
import { modalService } from "@/shared/services/modal";

const hours = Array.from({ length: 24 }, (_, i) => i);
const minutes = Array.from({ length: 60 }, (_, i) => i);

export const TimePicker: React.FC<TimePickerProps> = ({
  initialHour = 0,
  initialMinute = 0,
  onConfirm,
}) => {
  const selectedHour = useRef(initialHour);
  const selectedMinute = useRef(initialMinute);

  const handleConfirm = useCallback(() => {
    if (onConfirm) {
      onConfirm(selectedHour.current, selectedMinute.current);
    }

    modalService.hide();
  }, [onConfirm]);

  return (
    <Box>
      <Box
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        mb="sp40"
        backgroundColor="backgroundSecondary"
        borderRadius="rd15"
        paddingVertical="sp10"
      >
        <TimeWheel
          items={hours}
          selectedIndex={selectedHour}
          onSelect={(value) => {
            selectedHour.current = value;
          }}
        />

        <Box justifyContent="center" alignItems="center" mx="sp10">
          <Text text=":" preset="bold/30" color="textPrimary" />
        </Box>

        <TimeWheel
          items={minutes}
          selectedIndex={selectedMinute}
          onSelect={(value) => {
            selectedMinute.current = value;
          }}
        />
      </Box>

      <Box flexDirection="row" gap="sp15">
        <Box flex={1}>
          <Button
            testID="timepicker-done-button"
            text="Done"
            variant="filled"
            enableGradient
            onPress={handleConfirm}
          />
        </Box>
      </Box>
    </Box>
  );
};
