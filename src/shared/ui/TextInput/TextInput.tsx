import React, { useState } from "react";
import {
  TextInput as TextInputRN,
  TextInputProps as RNTextInputProps,
} from "react-native";

import { If } from "@/shared/helpers/components/If";

import { buildInputStatus, buildStatusStyles } from "./library";
import { Box, BoxProps } from "../Box/Box";
import { Text } from "../Text/Text";
import { palette } from "@/styles";

export type TextInputProps = {
  LeftElement?: React.JSX.Element;
  RightElement?: React.JSX.Element;
  errorMessage?: string;
  disabled?: boolean;
  boxProps?: BoxProps;
  title?: string;
} & RNTextInputProps;

export function TextInput(props: TextInputProps) {
  const {
    LeftElement,
    RightElement,
    errorMessage,
    boxProps,
    title,
    ...textInputProps
  } = props;
  const [height, setHeight] = useState(boxProps?.height ?? 150);
  const _status = buildInputStatus(props);
  const _statusStyles = buildStatusStyles(_status);

  return (
    <Box width={"100%"} style={{ gap: 5 }}>
      <If condition={!!title}>
        <Box marginBottom="sp10">
          <Text preset="semiBold/16" text={title!} color="textPrimary" />
        </Box>
      </If>
      <Box
        width={"100%"}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        px="sp15"
        py="sp15"
        borderRadius="rd15"
        height={textInputProps.multiline ? height : undefined}
        shadowOffset={{ width: 0, height: 1 }}
        shadowOpacity={0.1}
        shadowRadius={10}
        shadowColor={"surfaceBorder"}
        {..._statusStyles}
        {...boxProps}
      >
        <If condition={!!LeftElement}>
          <Box mr="sp15">{LeftElement}</Box>
        </If>

        <TextInputRN
          {...textInputProps}
          placeholderTextColor={"#ACADB9"}
          style={{
            flex: 1,
            height: "100%",
            color: palette.text.secondary,
          }}
          autoCapitalize="none"
        />
        <If condition={!!RightElement}>
          <Box>{RightElement}</Box>
        </If>
      </Box>
      <If condition={!!errorMessage}>
        <Box width={"100%"} pl="sp10">
          <Text
            preset="medium/14"
            color="feedbackError"
            text={errorMessage ?? ""}
          />
        </Box>
      </If>
    </Box>
  );
}
