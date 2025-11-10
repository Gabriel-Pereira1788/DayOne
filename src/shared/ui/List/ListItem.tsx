import {TouchableOpacityBox} from '../Box';

import {TouchableOpacityProps} from 'react-native';

type ListItemProps = {} & TouchableOpacityProps;

export function ListItem({
  children,
  ...touchableOpacityProps
}: React.PropsWithChildren<ListItemProps>) {
  return (
    <TouchableOpacityBox
      boxProps={{
        backgroundColor: 'backgroundSecondary',
        paddingHorizontal: 'sp20',
        paddingVertical: 'sp15',
        borderRadius: 'rd8',
        borderLeftWidth: 3,
        borderLeftColor: 'textPrimary',
        marginBottom: 'sp10',
      }}
      activeOpacity={0.8}
      {...touchableOpacityProps}>
      {children}
    </TouchableOpacityBox>
  );
}
