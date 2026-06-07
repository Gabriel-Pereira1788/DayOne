import { Box, Button, Text } from "@/shared/ui";
import { Image } from "react-native";
import Animated, { FadeInDown, FadeInLeft } from "react-native-reanimated";

export function WelcomeScreen() {
  return (
    <Box flex={1} alignItems="center" justifyContent="space-between" pt="sp28">
      <Box
        flex={1}
        width={"100%"}
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        <Image
          source={require("../../../../../assets/brand/splash-icon.png")}
          style={{
            width: 200,
            height: 200,
          }}
        />

        <Box px="sp25" gap="sp10">
          <Animated.View entering={FadeInLeft}>
            <Text text="Start with " preset="bold/30">
              <Text text="Day One." preset="bold/30" color="surfaceTertiary" />
            </Text>
          </Animated.View>

          <Animated.View entering={FadeInDown}>
            <Text text="Your future self will thank you." preset="medium/20" />
          </Animated.View>
        </Box>
      </Box>
      <Box gap="sp10" width={"100%"}>
        <Button
          leftIconName="appleLogo"
          variant="filled"
          enableGradient
          text="Sign In With Apple"
          onPress={() => {}}
        />
        <Button
          leftIconName="googleLogo"
          variant="outline"
          enableGradient
          text="Sign In With Google"
          onPress={() => {}}
        />
      </Box>
    </Box>
  );
}
