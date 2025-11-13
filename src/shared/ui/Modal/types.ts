export interface ModalConfig {
  content: React.ReactNode | null;
  animationType?: "slide" | "fade";
  presentationStyle?: "pageSheet" | "formSheet";
}

export interface ModalProps {
  config: ModalConfig;
  visible: boolean;
  onClose: () => void;
}
