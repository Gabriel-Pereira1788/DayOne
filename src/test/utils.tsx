import { QueryClientConfig } from "@tanstack/query-core";
import { renderRouter } from "expo-router/testing-library";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@shopify/restyle";
import { theme } from "../styles";

import { KeyboardProvider } from "react-native-keyboard-controller";

import { inAppStorage } from "@/infra/adapters/storage/implementation/inApp";

import { RootStack } from "../shared/navigation/root";

import { inAppRepositoryBuilder } from "@/infra/repository/implementation/inApp/in-app-repository";
import { StorageKeys } from "@/infra/adapters/storage/types";
import { QueryKeys } from "@/infra/types";
import Dashboard from "app/(app)/dashboard";
import NewHabit from "app/(app)/new-habit";

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
        <KeyboardProvider>{children}</KeyboardProvider>
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
    },
    {
      wrapper: Wrapper,
      initialUrl,
    },
  );
}

export * from "@testing-library/react-native";
