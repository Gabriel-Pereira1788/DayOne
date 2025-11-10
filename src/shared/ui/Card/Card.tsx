import {Box, BoxProps} from '../Box';

export function Card({
  children,
  ...boxProps
}: React.PropsWithChildren<BoxProps>) {
  return (
    <Box
      backgroundColor="backgroundSecondary"
      p="sp20"
      borderRadius="rd15"
      borderWidth={1}
      borderColor="surfaceBorder"
      {...boxProps}>
      {children}
    </Box>
  );
}
