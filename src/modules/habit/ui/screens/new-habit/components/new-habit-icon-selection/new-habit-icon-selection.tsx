import { Box, Icon, IconProps, TouchableOpacityBox } from "@/shared/ui";
import { IconsSelection } from "@/shared/ui/Icon/IconsSelection";
import { useState } from "react";
import { NewHabitIconSelectionProps } from "./types";
import { modalService } from "@/shared/services/modal";

export function NewHabitIconSelection({
  onChangeIcon,
}: NewHabitIconSelectionProps) {
  const [selectedIcon, setSelectedIcon] = useState<
    IconProps["iconName"] | null
  >(null);

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
        boxProps={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {selectedIcon ? (
          <Icon iconName={selectedIcon} size={50} color="textSecondary" />
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
