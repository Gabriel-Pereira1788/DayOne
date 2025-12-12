import { AICommand } from "../../ai.model";

export interface CommandExecutorResult {
  success: boolean;
  data?: any;
  error?: string;
  originalCommand: AICommand;
}
