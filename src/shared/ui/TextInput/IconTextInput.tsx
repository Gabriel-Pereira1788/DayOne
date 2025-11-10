import {IconPress} from '../Icon';
import {Icon, IconProps} from '../Icon/Icon';

import {TextInput, TextInputProps} from './TextInput';

export type IconTextInputProps = {
  leftIconProps?: Omit<IconProps, 'size'>;
  rightIconProps?: Omit<IconProps, 'size'> & {onPress?: VoidFunction};
} & TextInputProps;

export function IconTextInput({
  leftIconProps,
  rightIconProps,
  ...inputProps
}: IconTextInputProps) {
  return (
    <TextInput
      {...inputProps}
      LeftElement={
        leftIconProps && (
          <Icon {...leftIconProps} size={25} color="textSecondary" />
        )
      }
      RightElement={
        rightIconProps && (
          <IconPress {...rightIconProps} size={25} variant="transparent" />
        )
      }
    />
  );
}
