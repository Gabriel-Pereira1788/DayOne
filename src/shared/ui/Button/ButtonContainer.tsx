import {Box} from '../Box/Box';
import {BoxGradient} from '../Box/BoxGradient';
// import { BoxGradient } from "../Box";

type ButtonContainerProps = {
  rightIconName?: boolean;
  enableGradient?: boolean;
} & React.PropsWithChildren;
export function ButtonContainer({
  children,
  enableGradient = false,
  rightIconName,
}: ButtonContainerProps) {
  if (enableGradient) {
    return (
      <BoxGradient
        colors={[
          'backgroundPrimary',
          'buttonPrimaryBackground',
          'buttonSecondaryBackground',
          'buttonSecondaryHover',
        ]}
        flexDirection={rightIconName ? 'row' : 'column'}
        gap="sp10"
        width={'100%'}
        height={'100%'}
        alignItems="center"
        justifyContent="center"
        startPoint={{
          x: 0.3,
          y: 0.1,
        }}
        endPoint={{
          x: 0.9,
          y: 0.1,
        }}>
        {children}
      </BoxGradient>
    );
  }
  return (
    <Box flexDirection={rightIconName ? 'row' : 'column'} gap="sp10">
      {children}
    </Box>
  );
}
