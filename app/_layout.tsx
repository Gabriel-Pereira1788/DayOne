import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "@shopify/restyle";
import { theme } from "@/styles";
import { RootStack } from "@/shared/navigation/root";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { storageRepositoryBuilder } from "@/infra/repository/implementation/storage/storage-repository";
import { mmkvImpl } from "@/infra/adapters/storage/implementation/mmkv";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { rnScheduleNotificationImpl } from "@/infra/adapters/schedule-notification/implementation/rn-schedule-notification";
import { execuTorchImpl } from "@/infra/adapters/llm/implementation/executorch";
import { DIProvider } from "@/infra/DI/context";
import { DIKeys } from "@/infra/DI/types";
import { authServiceImpl } from "@/infra/adapters/auth/implementation";
import { axiosHttpClientImpl } from "@/infra/adapters/http-client/implementation/axios";
import { setLoggerImpl } from "@/infra/logger";
import { reactotronLoggerImpl } from "@/infra/logger/implementation/reactotron";
export const queryClient = new QueryClient();

setLoggerImpl(reactotronLoggerImpl);
export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <KeyboardProvider>
          <ThemeProvider theme={theme}>
            <DIProvider
              config={(container) => {
                container.registerService(
                  DIKeys.Repository,
                  storageRepositoryBuilder,
                );
                container.registerService(DIKeys.LLMService, execuTorchImpl);
                container.registerService(DIKeys.Storage, mmkvImpl);
                container.registerService(
                  DIKeys.ScheduleNotification,
                  rnScheduleNotificationImpl,
                );
                container.registerService(
                  DIKeys.AuthService,
                  authServiceImpl,
                );
                container.registerService(
                  DIKeys.HttpClient,
                  axiosHttpClientImpl,
                );
              }}
            >
              <StatusBar style="light" />
              <RootStack />
            </DIProvider>
          </ThemeProvider>
        </KeyboardProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
