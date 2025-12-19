import { QueryClientConfig } from "@tanstack/query-core";
import { renderRouter } from "expo-router/testing-library";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@shopify/restyle";
import { theme } from "../styles";

import { KeyboardProvider } from "react-native-keyboard-controller";

import { inAppStorage } from "@/infra/adapters/storage/implementation/inApp";

import { RootStack } from "../shared/navigation/root";

import { StorageKeys } from "@/infra/adapters/storage/types";
import { QueryKeys } from "@/infra/types";
import Dashboard from "../../app/(app)/dashboard";
import NewHabit from "../../app/(app)/new-habit";
import EditHabit from "../../app/(app)/edit-habit";
import HabitDetails from "../../app/(app)/habit-details/[id]";
import AiChat from "../../app/(app)/ai-chat";
import type { LLMServiceImpl } from "@/infra/adapters/llm/types";
import { DIProvider } from "@/infra/DI/context";
import { DIKeys } from "@/infra/DI/types";
import { inAppRepositoryBuilder } from "@/infra/repository/implementation/inApp/in-app-repository";
import { inAppScheduleNotification } from "@/infra/adapters/schedule-notification/implementation/inApp/in-app-schedule-notification";

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
};

export const queryClientMock = new QueryClient(queryClientConfig);
export function Wrapper({ children }: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClientMock}>
      <ThemeProvider theme={theme}>
        <DIProvider
          config={(container) => {
            container.registerService(DIKeys.LLMService, {} as LLMServiceImpl);
            container.registerService(DIKeys.Storage, inAppStorage);
            container.registerService(
              DIKeys.ScheduleNotification,
              inAppScheduleNotification,
            );
            container.registerService(
              DIKeys.Repository,
              inAppRepositoryBuilder,
            );
          }}
        >
          <KeyboardProvider>{children}</KeyboardProvider>
        </DIProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
export function renderApp({
  initialUrl = "/",
  isAuthenticated = false,
}: {
  initialUrl: string;
  isAuthenticated?: boolean;
}) {
  if (isAuthenticated) {
    queryClientMock.setQueryData([QueryKeys.Session], {
      accessToken: "",
      refreshToken: "",
      user: {
        username: "gabs",
        email: "gabs@gmail.com",
        createdAt: new Date(),
      },
    });

    inAppStorage.setItem(StorageKeys.SESSION, {
      accessToken: "",
      refreshToken: "",
      user: {
        username: "gabs",
        email: "gabs@gmail.com",
        createdAt: new Date(),
      },
    });
  } else {
    queryClientMock.setQueryData([StorageKeys.SESSION], undefined);
    inAppStorage.removeItem(StorageKeys.SESSION);
  }

  renderRouter(
    {
      _layout: () => <RootStack />,

      "(app)/dashboard": () => <Dashboard />,
      "(app)/new-habit": () => <NewHabit />,
      "(app)/edit-habit/index": () => <EditHabit />,
      "(app)/habit-details/[id]/index": () => <HabitDetails />,
      "(app)/ai-chat/index": () => <AiChat />,
    },
    {
      wrapper: Wrapper,
      initialUrl,
    },
  );
}

export * from "@testing-library/react-native";
