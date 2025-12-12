import { Box } from "@/shared/ui";
import { AIChatFooterSectionProps } from "./types";
import { AISendInput } from "@/modules/ai/ui/components/ai-send-input/ai-send-input";
import { ProgressiveBlurView } from "@sbaiahmed1/react-native-blur";
import { StyleSheet } from "react-native";
import { useAppSafeArea } from "@/shared/helpers";

export function AIChatFooterSection({ onSend }: AIChatFooterSectionProps) {
  const { bottom } = useAppSafeArea();
  return (
    <>
      <Box
        width={"100%"}
        position="absolute"
        alignSelf="flex-end"
        bottom={bottom}
        zIndex={100}
      >
        <Box px="sp25">
          <AISendInput onSend={onSend} />
        </Box>
      </Box>
      <Box width={"100%"} position="absolute" bottom={0}>
        <ProgressiveBlurView
          blurType="dark"
          blurAmount={1.5}
          direction="blurredBottomClearTop"
          startOffset={0.1}
          style={[styles.blurContainer]}
        />
      </Box>
    </>
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    height: 100,
    paddingBottom: 40,
  },
});
