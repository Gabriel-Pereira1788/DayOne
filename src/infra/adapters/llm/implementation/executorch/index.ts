import {
  HAMMER2_1_0_5B,
  LLAMA3_2_1B_SPINQUANT,
  QWEN2_5_1_5B,
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

const llmInstance = new LLMModule();
async function initialize({
  onDownloadProgress,
  tokenCallback,
}: InitializeProps) {
  try {
    await llmInstance.load(
      {
        modelSource: HAMMER2_1_0_5B.modelSource,
        tokenizerSource: HAMMER2_1_0_5B.tokenizerSource,
        tokenizerConfigSource: HAMMER2_1_0_5B.tokenizerConfigSource,
      },
      onDownloadProgress,
    );
    if (!!tokenCallback) {
      llmInstance.setTokenCallback({ tokenCallback });
    }
    initialized = true;
  } catch (error) {
    initialized = false;
    throw error;
  }
}

function configure({
  systemPrompt,
  tools,
  executeToolCallback,
  initialMessageHistory,
}: Configure) {
  const mappedMessages = initialMessageHistory?.map((message) => ({
    content: message.content,
    role: message.role as MessageRole,
  }));
  llmInstance.configure({
    chatConfig: {
      systemPrompt: systemPrompt,
      initialMessageHistory: mappedMessages,
    },
    toolsConfig: {
      tools,
      executeToolCallback,
    },
  });
}

function isInitialized(): boolean {
  return initialized;
}

function deleteModel() {
  try {
    llmInstance.delete();
  } catch (err) {
    console.log("ERROR-ON-DELETEMODEL", err);
    llmInstance.interrupt();
  }
}

async function sendMessage(content: string) {
  const response = await llmInstance.sendMessage(content);
  return response;
}

function interrupt() {
  llmInstance.interrupt();
}

export const execuTorchImpl: LLMServiceImpl = {
  initialize,
  sendMessage,
  interrupt,
  isInitialized,
  deleteModel,
  configure,
};
