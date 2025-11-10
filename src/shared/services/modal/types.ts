export interface ModalService {
  open: (config: ModalConfig) => void;
  hide: () => void;
}

export interface ModalConfig {
  content: React.ReactNode | null;
  animationType?: "slide" | "fade";
  presentationStyle?: "pageSheet" | "formSheet";
}
