import React from "react";
import { ActivityIndicator, TouchableOpacityProps } from "react-native";

import { If } from "@/shared/helpers/components/If";

import { buildVariant } from "./library";
import { TouchableOpacityBox } from "../Box/TouchableOpacityBox";
import { Text } from "../Text/Text";
import { Icon, IconName } from "../Icon";
import { ButtonContainer } from "./ButtonContainer";

export type ButtonProps = {
  text: string;
  loading?: boolean;
  variant?: "outline" | "filled" | "transparent" | "elevated";
  rightIconName?: IconName;
  enableGradient?: boolean;
} & TouchableOpacityProps;

export function Button({
  text,
  loading,
  variant = "filled",
  rightIconName,
  disabled,
  enableGradient = false,
  ...touchableOpacityProps
}: ButtonProps) {
  const _variant = buildVariant(variant);
  return (
    <TouchableOpacityBox
      boxProps={{
        width: "100%",
        borderRadius: "rd15",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        opacity: loading || disabled ? 0.7 : 1,
        ..._variant.container,
      }}
      activeOpacity={0.8}
      disabled={loading}
      {...touchableOpacityProps}
    >
      <ButtonContainer
        variant={variant}
        rightIconName={!!rightIconName}
        enableGradient={enableGradient}
      >
        <If
          condition={!!loading}
          elseRender={
            <Text preset="semiBold/16" text={text} color={_variant.textColor} />
          }
        >
          <ActivityIndicator testID={"loading-button"} size={20} />
        </If>

        <If condition={!!rightIconName && !loading}>
          <Icon iconName={rightIconName!} color={_variant.textColor} />
        </If>
      </ButtonContainer>
    </TouchableOpacityBox>
  );
}
