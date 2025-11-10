import {createBox, BoxProps as BoxPropsRE} from '@shopify/restyle';
import {Theme} from '@/styles/theme';

export const Box = createBox<Theme>();

export type BoxProps = BoxPropsRE<Theme>;
