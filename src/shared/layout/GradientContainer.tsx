import { useAppSafeArea } from "../helpers";
import { BoxGradient } from "../ui/Box/BoxGradient";
import { PageProps } from "./Page";

type Props = {
  disablePadding?: PageProps["disablePadding"];
};
export function GradientContainer({
  disablePadding,
  children,
}: React.PropsWithChildren<Props>) {
  const { top, bottom } = useAppSafeArea();
  return (
    <BoxGradient
      flex={1}
      colors={["backgroundSecondary", "backgroundTertiary", "surfaceSecondary"]}
      startPoint={{ x: 0, y: 0 }}
      endPoint={{ x: 1, y: 1 }}
      paddingHorizontal={!disablePadding?.horizontal ? "sp20" : undefined}
      style={{
        paddingTop: !disablePadding?.top ? top : undefined,
        paddingBottom: !disablePadding?.bottom ? bottom : undefined,
      }}
    >
      {children}
    </BoxGradient>
  );
}
