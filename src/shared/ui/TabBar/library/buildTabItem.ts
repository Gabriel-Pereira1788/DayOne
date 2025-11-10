import {IconProps} from '../../Icon';

export type KeyTabParamList = 'home' | 'ds' | 'settings';

const mappedScreenToProps: Record<
  KeyTabParamList,
  {iconName: IconProps['iconName']; text: string}
> = {
  home: {
    iconName: 'house',
    text: 'Home',
  },
  ds: {
    iconName: 'palette',
    text: 'Design',
  },
  settings: {
    iconName: 'gear',
    text: 'Settings',
  },
};

export function buildTabItem(routeName: KeyTabParamList) {
  return mappedScreenToProps[routeName];
}
