import {
  Configure,
  InitializeProps,
  LLMServiceImpl,
  Message,
} from "../../types";

let initialized = false;
let mockConfigure: Configure;
async function initialize({ onDownloadProgress }: InitializeProps) {
  let intervalId: NodeJS.Timeout;
  let progress = 0;
  return new Promise<void>((resolve, reject) => {
    intervalId = setInterval(() => {
      progress += 0.1;
      if (progress.toFixed(1) === "0.9") {
        progress = 1;
      }
      onDownloadProgress(progress);

      if (progress >= 1) {
        clearInterval(intervalId);
        initialized = true;
        resolve();
      }
    }, 100);
  });
}

function deleteModel() {}

function configure({
  executeToolCallback,
  tools,
  systemPrompt,
  initialMessageHistory,
}: Configure) {
  mockConfigure = {
    executeToolCallback,
    tools,
    systemPrompt,
    initialMessageHistory,
  };
}

function isInitialized(): boolean {
  return initialized;
}

async function sendMessage(content: string) {
  return new Promise<Message[]>((resolve) => {
    if (content.includes("create habit")) {
      mockConfigure.executeToolCallback({
        arguments: {
          title: "Habit test",
        },
        toolName: "CREATE_HABIT",
      });
      resolve([]);
    }

    if (content.includes("get my habits")) {
      mockConfigure.executeToolCallback({
        arguments: {},
        toolName: "GET_HABITS",
      });
      resolve([]);
    }

    if (content.includes("search a habit with title Ler livros")) {
      mockConfigure.executeToolCallback({
        arguments: {
          query: "Ler livros",
        },
        toolName: "SEARCH_HABITS",
      });
      resolve([]);
    }

    resolve([]);
  });
}

function interrupt() {}

export const inAppLLM: LLMServiceImpl = {
  initialize,
  configure,
  deleteModel,
  interrupt,
  isInitialized,
  sendMessage,
};
