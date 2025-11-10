import React from "react";
import { ModalConfig, ModalService } from "./types";

export const ModalRef = React.createRef<ModalService>();
function open(config: ModalConfig) {
  ModalRef.current?.open(config);
}

function hide() {
  ModalRef.current?.hide();
}

export const modalService: ModalService = {
  open,
  hide,
};
