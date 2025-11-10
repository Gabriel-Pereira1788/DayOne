import React from "react";
import { TouchableOpacity } from "react-native";

import Animated from "react-native-reanimated";
import { Icon, IconProps } from "@/shared/ui/Icon";
import { Box } from "@/shared/ui/Box";
import { Text } from "../Text/Text";

type TabBarItemProps = {
  iconName: IconProps["iconName"];
  focused: boolean;
  text: string;
  onPress?: VoidFunction;
};

const TouchableOpacityAnimated =
  Animated.createAnimatedComponent(TouchableOpacity);

export function TabBarItem({
  iconName,
  focused,

  text,
  onPress,
}: TabBarItemProps) {
  return (
    <TouchableOpacityAnimated
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        alignItems: "center",
        flex: 1,
        position: "relative",
      }}
      accessibilityRole="button"
    >
      <Icon
        iconName={iconName}
        color={focused ? "textPrimary" : "textSecondary"}
        size={25}
      />
      <Box mt="sp5">
        <Text
          text={text}
          preset="medium/10"
          color={focused ? "textPrimary" : "textSecondary"}
        />
      </Box>
    </TouchableOpacityAnimated>
  );
}
