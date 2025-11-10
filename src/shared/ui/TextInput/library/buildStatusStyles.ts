import {BoxProps} from '../../Box/Box';
import {InputStatus} from '../types';

export function buildStatusStyles(status: InputStatus): BoxProps {
  switch (status) {
    case 'error':
      return {
        bg: 'backgroundPrimary',
        borderColor: 'feedbackError',
        borderWidth: 2,
      };
    case 'disabled':
      return {
        borderColor: 'surfaceBorder',
      };
    default:
      return {
        bg: 'backgroundPrimary',
      };
  }
}
