import { Message } from "@/infra/adapters/llm/types";

export interface MessageBubbleProps {
  message: Message;
  animated?: boolean;
  animatedPrefix?: string;
  animatingText?: string;
  transparent?: boolean;
  showTimestamp?: boolean;
  onAnimationComplete?: () => void;
}
