import { useAppSafeArea } from "@/shared/helpers";
import { Box } from "../Box";
import { TabBarProps } from "./types";
import { buildTabItem, KeyTabParamList } from "./library/buildTabItem";
import { TabBarItem } from "./TabBarItem";
import BlurView, { ProgressiveBlurView } from "@sbaiahmed1/react-native-blur";
export function TabBar({ state, navigation }: TabBarProps) {
  const { bottom } = useAppSafeArea();
  return (
    <BlurView
      blurType="dark"
      blurAmount={50}
      ignoreSafeArea
      style={{
        alignItems: "center",
        bottom:0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingBottom: bottom,
        paddingTop:20,
        flex: 1,
        position: "absolute",
        width: "100%",

      }}
    >
      <Box
        flex={1}
        alignSelf="center"
        alignItems="center"
        justifyContent="center"
        flexDirection="row"
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
    </BlurView>
  );
}
