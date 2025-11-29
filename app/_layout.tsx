import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "@shopify/restyle";
import { theme } from "@/styles";
import { RootStack } from "@/shared/navigation/root";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { setRepositoryService } from "@/shared/services/repository";
import { storageRepositoryBuilder } from "@/infra/repository/implementation/storage/storage-repository";
import { setStorage } from "@/shared/services/storage/storage.service";
import { mmkvImpl } from "@/infra/adapters/storage/implementation/mmkv";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { setScheduleNotification } from "../src/shared/services/schedule-notification";
import { rnScheduleNotificationImpl } from "@/infra/adapters/schedule-notification/implementation/rn-schedule-notification";
export const queryClient = new QueryClient();

setRepositoryService(storageRepositoryBuilder);
setStorage(mmkvImpl);
setScheduleNotification(rnScheduleNotificationImpl);

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <KeyboardProvider>
          <ThemeProvider theme={theme}>
            <StatusBar style="light" />
            <RootStack />
          </ThemeProvider>
        </KeyboardProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
