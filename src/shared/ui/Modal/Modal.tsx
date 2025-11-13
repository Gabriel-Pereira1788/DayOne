import { Modal as RNModal } from "react-native";
import { Box } from "@/shared/ui";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import {
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { dimensions, useAppSafeArea } from "@/shared/helpers";
import { ModalProps } from "./types";

import { useModalController } from "./modal.controller";
import { useModalAnimatedStyles } from "./hooks";

const AnimatedBox = Animated.createAnimatedComponent(Box);

export function Modal(props: ModalProps) {
  const { config, visible, onClose } = props;
  const { contentHeight, panGesture, translateY, maxHeight } =
    useModalController(props);
  const { backdropStyle, bottomSheetStyle } = useModalAnimatedStyles({
    translateY,
  });

  return (
    <RNModal visible={visible} transparent onRequestClose={onClose}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Box position="relative" flex={1} justifyContent="flex-end">
          <Animated.View
            onTouchStart={(e) => {
              e.stopPropagation();
              onClose();
            }}
            style={[
              {
                flex: 1,
                width: dimensions.width,
                height: dimensions.height,
                position: "absolute",
                zIndex: 10,
              },
              backdropStyle,
            ]}
          />

          <GestureDetector gesture={panGesture}>
            <AnimatedBox
              entering={SlideInDown}
              onLayout={(event) => {
                const { width, height } = event.nativeEvent.layout;
                contentHeight.current = height;
              }}
              exiting={SlideOutDown}
              onTouchStart={(e) => e.stopPropagation()}
              flexGrow={1}
              maxHeight={maxHeight}
              width={"100%"}
              backgroundColor="backgroundTertiary"
              position="absolute"
              zIndex={100}
              borderTopLeftRadius="rd40"
              borderTopRightRadius="rd40"
              style={bottomSheetStyle}
            >
              {/* Indicador visual para arrastar */}
              <Box
                width={50}
                height={5}
                backgroundColor="surfaceBorder"
                borderRadius="rd12"
                alignSelf="center"
                mb="sp15"
              />

              <Box py="sp20" px="sp25">
                {config.content && config.content}
              </Box>
            </AnimatedBox>
          </GestureDetector>
        </Box>
      </GestureHandlerRootView>
    </RNModal>
  );
}
