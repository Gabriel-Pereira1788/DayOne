import { useImperativeHandle, useState } from "react";
import { ModalConfig } from "../types";

import { ModalRef } from "../modal.service";

import { Modal } from "@/shared/ui/Modal/Modal";

export function ModalProvider() {
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

  return <Modal config={config} onClose={hide} visible={visible} />;
}
