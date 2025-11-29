import { dimensions, useAppSafeArea } from "@/shared/helpers";
import { useEffect, useRef, useState } from "react";
import { Gesture } from "react-native-gesture-handler";
import { useSharedValue, withSpring } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { ModalProps } from "./types";
import { CLOSE_THRESHOLD, VELOCITY_THRESHOLD } from "./constants";

export function useModalController({ onClose, visible }: ModalProps) {
  const { top } = useAppSafeArea();

  const contentHeight = useRef(0);
  const maxHeight = dimensions.height - 50 - top;

  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });

  const closeModal = () => {
    "worklet";
    scheduleOnRN(onClose);
  };

  const panGesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = Math.max(0, event.translationY + context.value.y);
    })
    .onEnd((event) => {
      if (
        translateY.value > CLOSE_THRESHOLD ||
        event.velocityY > VELOCITY_THRESHOLD
      ) {
        translateY.value = withSpring(maxHeight, { duration: 100 }, () => {
          closeModal();
        });
      } else {
        translateY.value = withSpring(0);
      }
    });

  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0);
    }
  }, [visible]);

  return {
    panGesture,
    maxHeight,
    translateY,

    contentHeight,
  };
}
