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
export const queryClient = new QueryClient();

setRepositoryService(storageRepositoryBuilder);
setStorage(mmkvImpl);

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <KeyboardProvider>
        <ThemeProvider theme={theme}>
          <StatusBar style="light" />
          <RootStack />
        </ThemeProvider>
      </KeyboardProvider>
    </QueryClientProvider>
  );
}
