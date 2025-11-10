import { useAppSafeArea } from "@/shared/helpers";
import { Box } from "../Box";
import { TabBarProps } from "./types";
import { buildTabItem, KeyTabParamList } from "./library/buildTabItem";
import { TabBarItem } from "./TabBarItem";

export function TabBar({ state, navigation }: TabBarProps) {
  const { bottom } = useAppSafeArea();
  return (
    <Box
      width={"80%"}
      alignSelf="center"
      paddingHorizontal="sp16"
      alignItems="center"
      justifyContent="center"
      position="absolute"
      borderRadius="rd100"
      bottom={bottom - 10}
      height={70}
      flexDirection="row"
      bg="backgroundSecondary"
      borderTopColor="textTertiary"
    >
      {state.routes.map((route, index) => {
        const tabItem = buildTabItem(route.name as KeyTabParamList);
        if (!tabItem) return null;
        const isFocused = state.index === index;

        function onPress() {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true } as any);
          }
        }
        return (
          <TabBarItem
            key={index}
            iconName={tabItem.iconName}
            focused={isFocused}
            onPress={onPress}
            text={tabItem.text}
          />
        );
      })}
    </Box>
  );
}
