import { Box } from "@/shared/ui";
import { router } from "expo-router";

import { DashboardHeaderProps } from "./types";
import { IconPress } from "@/shared/ui/Icon";

export function DashboardHeader({}: DashboardHeaderProps) {
  return (
    <Box width={"100%"} gap="sp10" mb="sp10">
      <Box
        flexDirection="row"
        width={"100%"}
        gap="sp15"
        px="sp20"
        alignItems="center"
        justifyContent="flex-end"
      >
        <IconPress
          testID="button-new-habit"
          iconName="plus"
          variant="transparent"
          size={35}
          weight="bold"
          onPress={() => {
            router.navigate("/(app)/new-habit");
          }}
        />
        <IconPress
          testID="button-ai"
          variant="transparent"
          iconName="sparkle"
          size={35}
          weight="bold"
          onPress={() => {
            router.navigate("/(app)/ai-chat");
          }}
        />
      </Box>
    </Box>
  );
}
