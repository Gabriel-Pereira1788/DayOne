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
import BlurView from "@sbaiahmed1/react-native-blur";
import { useEffect, useState } from "react";

const AnimatedBox = Animated.createAnimatedComponent(Box);

export function Modal(props: ModalProps) {
  const { config, visible, onClose } = props;

  const { contentHeight, panGesture,bottom, translateY, maxHeight, keyboardHeight } =
    useModalController(props);

  const { backdropStyle, bottomSheetStyle } = useModalAnimatedStyles({
    translateY,
  });

  return (
    <RNModal visible={visible} transparent onRequestClose={onClose}>
      <GestureHandlerRootView style={{ flex: 1 }}>
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
        <Box position="relative" flex={1} justifyContent="flex-end">
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
              position="absolute"
              overflow={"hidden"}
              zIndex={100}
              borderTopLeftRadius="rd40"
              borderTopRightRadius="rd40"
              style={bottomSheetStyle}
            >
              <BlurView
                blurType="dark"
                blurAmount={50}
                ignoreSafeArea
                style={{
                  height: "100%",
                }}
              >
                <Box
                  width={50}
                  height={5}
                  backgroundColor="surfaceBorder"
                  borderRadius="rd12"
                  alignSelf="center"
                  mb="sp15"
                />

                <AnimatedBox
                  py="sp20"
                  px="sp25"
                  style={{
                    paddingBottom: keyboardHeight + bottom,
                  }}
                >
                  {config.content && config.content}
                </AnimatedBox>
              </BlurView>
            </AnimatedBox>
          </GestureDetector>
        </Box>
      </GestureHandlerRootView>
    </RNModal>
  );
}
