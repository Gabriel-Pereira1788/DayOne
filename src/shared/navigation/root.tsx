import { Stack } from "expo-router";
import { Page } from "../layout";
import { ModalProvider } from "../services/modal/context";

function isGradientEnabled(routeName: string) {
  if (
    routeName === "(app)/habit-details/[id]/index" ||
    routeName === "(app)/new-habit"
  )
    return false;

  return true;
}

export function RootStack() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      screenLayout={({ children, route }) => (
        <Page
          goBack={route.name !== "(app)/dashboard"}
          gradientEnabled={isGradientEnabled(route.name)}
          disablePadding={{
            top: route.name === "(app)/new-habit",
            horizontal: route.name === "(app)/dashboard",
          }}
          backgroundColor={
            route.name === "(app)/new-habit" ? "backgroundTertiary" : undefined
          }
        >
          {children}
          <ModalProvider />
        </Page>
      )}
    >
      <Stack.Screen name="(app)/dashboard" />
      <Stack.Screen name="(app)/edit-habit/index" />
      <Stack.Screen name="(app)/habit-details/[id]/index" />

      <Stack.Screen
        options={{
          presentation: "modal",
        }}
        name="(app)/new-habit"
      />
    </Stack>
  );
}
