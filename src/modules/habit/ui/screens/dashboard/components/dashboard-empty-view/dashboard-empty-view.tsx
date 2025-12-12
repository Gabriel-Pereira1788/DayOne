import { Box, Button, Icon, Text } from "@/shared/ui";
import { router } from "expo-router";
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInUp,
} from "react-native-reanimated";

export function DashboardEmptyView() {
  return (
    <Box
      flex={1}
      width={"100%"}
      alignItems="center"
      justifyContent="center"
      gap="sp20"
      px="sp20"
    >
      <Box gap="sp10">
        <Animated.View
          entering={FadeInUp}
          style={{
            gap: 10,
          }}
        >
          <Icon iconName="calendarPlus" color="textSecondary" size={90} />
          <Text text="No habits here… yet." preset="bold/30" />
        </Animated.View>
        <Animated.View entering={FadeInLeft}>
          <Text
            text="How about starting something your future self will thank you for?"
            preset="medium/20"
            color="textSecondary"
          />
        </Animated.View>
      </Box>
      <Animated.View
        style={{
          width: "100%",
        }}
        entering={FadeInDown}
      >
        <Button
          text="Create"
          variant="outline"
          rightIconName="plus"
          enableGradient
          onPress={() => {
            router.navigate("/(app)/new-habit");
          }}
        />
      </Animated.View>
    </Box>
  );
}
