import { Stack } from "expo-router";
import { Page } from "../layout";
import { Modal } from "../services/modal/context";

export function RootStack() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      screenLayout={({ children, route }) => (
        <Page
          gradientEnabled={route.name !== "(app)/new-habit"}
          disablePadding={{
            top: route.name === "(app)/new-habit",
            horizontal: route.name === "(app)/dashboard",
          }}
          backgroundColor={
            route.name === "(app)/new-habit" ? "backgroundTertiary" : undefined
          }
        >
          {children}
          <Modal />
        </Page>
      )}
    >
      <Stack.Screen name="(app)/dashboard" />

      <Stack.Screen
        options={{
          presentation: "modal",
        }}
        name="(app)/new-habit"
      />
    </Stack>
  );
}
