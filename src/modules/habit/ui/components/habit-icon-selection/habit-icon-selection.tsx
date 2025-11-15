import { Box, Icon, IconProps, TouchableOpacityBox } from "@/shared/ui";
import { IconsSelection } from "@/shared/ui/Icon/IconsSelection";
import { useState } from "react";
import { HabitIconSelectionProps } from "./types";
import { modalService } from "@/shared/services/modal";

export function HabitIconSelection({
  onChangeIcon,
  defaultIcon,
}: HabitIconSelectionProps) {
  const [selectedIcon, setSelectedIcon] = useState<
    IconProps["iconName"] | null
  >(defaultIcon || null);

  function handleOnChangeIcon(icon: IconProps["iconName"]) {
    setSelectedIcon(icon);
    onChangeIcon(icon);
    modalService.hide();
  }

  function handleOpen() {
    modalService.open({
      content: <IconsSelection onSelect={handleOnChangeIcon} />,
    });
  }

  return (
    <Box my="sp20">
      <TouchableOpacityBox
        onPress={handleOpen}
        testID="icon-selection-button"
        boxProps={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {selectedIcon ? (
          <Icon
            testID="icon-selected-icon"
            iconName={selectedIcon}
            size={50}
            color="textSecondary"
          />
        ) : (
          <>
            <Icon
              iconName="plus"
              weight="bold"
              size={30}
              color="textSecondary"
            />
            <Icon iconName="smiley" size={50} color="textSecondary" />
          </>
        )}
      </TouchableOpacityBox>
    </Box>
  );
}
