import {
  HAMMER2_1_1_5B,
  HAMMER2_1_TOKENIZER,
  HAMMER2_1_TOKENIZER_CONFIG,
  LLMModule,
  MessageRole,
} from "react-native-executorch";
import {
  Configure,
  InitializeProps,
  LLMServiceImpl,
  Message,
} from "../../types";

let initialized = false;

async function initialize({
  onDownloadProgress,
  tokenCallback,
}: InitializeProps) {
  try {
    await LLMModule.load({
      modelSource: HAMMER2_1_1_5B,
      tokenizerSource: HAMMER2_1_TOKENIZER,
      tokenCallback,

      tokenizerConfigSource: HAMMER2_1_TOKENIZER_CONFIG,
      onDownloadProgressCallback: onDownloadProgress,
    });
    initialized = true;
  } catch (error) {
    initialized = false;
    throw error;
  }
}

function configure({ systemPrompt, tools, executeToolCallback }: Configure) {
  LLMModule.configure({
    chatConfig: {
      systemPrompt: systemPrompt,
    },
    toolsConfig: {
      tools,
      executeToolCallback,
      displayToolCalls:true,
    },
  });
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
  LLMModule.deleteMessage;
  return initialized;
}

function deleteModel() {
  try {
    LLMModule.delete();
  } catch (err) {
    console.log("ERROR-ON-DELETEMODEL", err);
    LLMModule.interrupt();
  }
}

async function deleteMessage(id: number) {
  try {
    await LLMModule.deleteMessage(id);
  } catch (err) {
    console.log("ERROR-ON-DELETEMESSAGE", err);
    LLMModule.interrupt();
  }
}

export const execuTorchImpl: LLMServiceImpl = {
  initialize,
  generate,
  isInitialized,
  deleteMessage,
  deleteModel,
  configure,
};
