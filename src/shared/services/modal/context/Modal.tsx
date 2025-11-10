import { useImperativeHandle, useState } from "react";
import { ModalConfig } from "../types";
import { Modal as RNModal } from "react-native";
import { palette } from "@/styles";
import { Box } from "@/shared/ui";
import { ModalRef } from "../modal.service";

export function Modal() {
  const [visible, setVisible] = useState(false);
  const [config, setConfig] = useState<ModalConfig>({
    content: null,
    animationType: "slide",
    presentationStyle: "pageSheet",
  });

  useImperativeHandle(ModalRef, () => ({
    open,
    hide,
  }));

  function open(config: ModalConfig) {
    setConfig(config);
    setVisible(true);
  }

  function hide() {
    setVisible(false);
  }

  return (
    <RNModal
      visible={visible}
      onRequestClose={() => setVisible(false)}
      animationType="slide"
      presentationStyle="pageSheet"
      backdropColor={palette.background.tertiary}
      style={{
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
      }}
    >
      <Box flex={1} height={200} backgroundColor="backgroundTertiary" py="sp20" px="sp25">
        {config.content && config.content}
      </Box>
    </RNModal>
  );
}
