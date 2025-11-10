import {useState} from 'react';

import {IconTextInput} from './IconTextInput';
import {TextInputProps} from './TextInput';

export type SecurityInputProps = {} & Omit<
  TextInputProps,
  'LeftElement' | 'RightElement'
>;
export function SecurityInput({...inputProps}: SecurityInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  function toggleShowPassword() {
    setShowPassword(prev => !prev);
  }
  return (
    <IconTextInput
      {...inputProps}
      secureTextEntry={!showPassword}
      leftIconProps={{
        iconName: 'lock',
      }}
      rightIconProps={{
        iconName: showPassword ? 'eye' : 'eyeSlash',
        color: 'textSecondary',
        onPress: toggleShowPassword,
      }}
    />
  );
}
