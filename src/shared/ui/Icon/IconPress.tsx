import { Icon, IconProps } from "./Icon";
import { TouchableOpacityBox } from "../Box/TouchableOpacityBox";
import { BoxProps } from "../Box/Box";
import { buildVariant } from "./library/buildVariant";
import { Theme } from "@/styles";
import { TouchableBounce } from "../Touchable";

export type IconPressProps = {
  onPress?: VoidFunction;
  testID?: string;
  variant?: "filled" | "transparent" | "rounded";
  enableGradient?: boolean;
  backgroundColor?: keyof Theme["colors"];
  tintColor?: keyof Theme["colors"];
  disabled?: boolean;
  activeOpacity?: number;
} & IconProps;

export function IconPress({
  onPress,
  testID,
  variant = "filled",
  activeOpacity,
  enableGradient,
  backgroundColor,
  tintColor,
  disabled,
  ...iconProps
}: IconPressProps) {
  const boxProps: BoxProps | undefined = buildVariant(variant, enableGradient);

  return (
    <TouchableBounce
      onPress={onPress}
      activeOpacity={activeOpacity ?? 0.8}
      testID={testID}
      disabled={disabled}
      boxProps={!enableGradient ? { ...boxProps } : undefined}
    >
      <Icon {...iconProps} color={disabled ? "textSecondary" : tintColor} />
    </TouchableBounce>
  );
}
