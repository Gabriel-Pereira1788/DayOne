import { Message } from "@/infra/adapters/llm/types";

export interface MessageBubbleProps {
  message: Message;
  animated?: boolean;
  animatedPrefix?: string;
  animatingText?: string;
  onAnimationComplete?: () => void;
}