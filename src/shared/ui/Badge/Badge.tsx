import { Theme } from "@/styles";
import { Box, BoxProps } from "../Box";
import { Text } from "../Text/Text";
import { TextProps } from "../Text/textTypes";

type BadgeProps = {
  text: string;
  textProps?: Omit<TextProps, "text">;
  color?: keyof Theme["colors"];
} & BoxProps;
export function Badge({ text, color, textProps, ...boxProps }: BadgeProps) {
  return (
    <Box
      backgroundColor="surfaceSecondary"
      paddingHorizontal="sp12"
      paddingVertical="sp7"
      borderRadius="rd100"
      {...boxProps}
    >
      <Text preset="medium/10" text={text} color={color} {...textProps} />
    </Box>
  );
}
