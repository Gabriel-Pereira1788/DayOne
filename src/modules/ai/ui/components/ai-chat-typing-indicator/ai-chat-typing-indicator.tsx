import { Box, Icon } from "@/shared/ui";
import { palette } from "@/styles";
import Animated from "react-native-reanimated";

export function AIChatTypingIndicator() {
  return (
    <Box
      marginBottom="sp12"
      paddingHorizontal="sp20"
      flexDirection="row"
      justifyContent="flex-start"
    >
      <Box
        maxWidth="75%"
        backgroundColor="backgroundSecondary"
        borderRadius="rd15"
        borderTopLeftRadius="rd4"
        padding="sp12"
        paddingHorizontal="sp15"
      >
        <Box flexDirection="row" alignItems="center" gap="sp10">
          <Icon iconName="brain" size={20} color="textTertiary" />
          <Box flexDirection="row" gap="sp3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Animated.View
                key={index}
                style={{
                  width: 4,
                  height: 4,
                  backgroundColor: palette.text.tertiary,
                  borderRadius: 100,
                  animationDuration: "500ms",
                  animationDelay: `${index * 300}ms`,
                  animationIterationCount: "infinite",
                  animationDirection: "alternate",
                  animationName: {
                    from: { transform: [{ translateY: 0 }] },
                    to: { transform: [{ translateY: -5 }] },
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
