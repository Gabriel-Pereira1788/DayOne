import {
  QWEN3_0_6B,
  QWEN3_TOKENIZER,
  QWEN3_TOKENIZER_CONFIG,
  LLMModule,
  MessageRole,
} from "react-native-executorch";
import { InitializeProps, LLMServiceImpl, Message } from "../../types";

let initialized = false;

async function initialize({
  onDownloadProgress,
  tokenCallback,
}: InitializeProps) {
  try {
    await LLMModule.load({
      modelSource: QWEN3_0_6B,
      tokenizerSource: QWEN3_TOKENIZER,
      tokenCallback,
      tokenizerConfigSource: QWEN3_TOKENIZER_CONFIG,
      onDownloadProgressCallback: onDownloadProgress,
    });
    initialized = true;
  } catch (error) {
    initialized = false;
    throw error;
  }
}

async function generate(messages: Message[]) {
  try {
    const mappedMessages = messages.map((message) => ({
      content: message.content,
      role: message.role as MessageRole,
    }));
    const response = await LLMModule.generate(mappedMessages);
    return { content: response || "" };
  } catch (err) {
    return {
      content: "",
      error: err instanceof Error ? err.message : "Erro na geração",
    };
  }
}

function isInitialized(): boolean {
  return initialized;
}

function deleteModel() {
  LLMModule.delete();
}

export const execuTorchImpl: LLMServiceImpl = {
  initialize,
  generate,
  isInitialized,
  deleteModel,
};
