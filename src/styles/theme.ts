import {createTheme} from '@shopify/restyle';
import {palette} from './palette';
export const theme = createTheme({
  colors: {
    backgroundPrimary: palette.background.primary,
    backgroundSecondary: palette.background.secondary,
    backgroundTertiary: palette.background.tertiary,
    surfacePrimary: palette.surface.primary,
    surfaceSecondary: palette.surface.secondary,
    surfaceTertiary: palette.surface.tertiary,
    surfaceBorder: palette.surface.border,
    textPrimary: palette.text.primary,
    textSecondary: palette.text.secondary,
    textTertiary: palette.text.tertiary,
    textPlaceholder: palette.text.placeholder,
    buttonDisabled: palette.button.primary.disabled,

    buttonPrimaryBackground: palette.button.primary.background,
    buttonPrimaryText: palette.button.primary.text,
    buttonPrimaryHover: palette.button.primary.hover,

    buttonSecondaryBackground: palette.button.secondary.background,
    buttonSecondaryText: palette.button.secondary.text,
    buttonSecondaryHover: palette.button.secondary.hover,

    buttonGhostBackground: palette.button.ghost.background,
    buttonGhostText: palette.button.ghost.text,
    buttonGhostHoverBackground: palette.button.ghost.hoverBackground,

    buttonElevatedBackgroundStart: palette.button.elevated.backgroundStart,
    buttonElevatedBackgroundEnd: palette.button.elevated.backgroundEnd,
    buttonElevatedBackgroundHoverStart: palette.button.elevated.hoverStart,
    buttonElevatedBackgroundHoverEnd: palette.button.elevated.hoverEnd,
    buttonElevatedDisabledStart: palette.button.elevated.disabledStart,
    buttonElevatedDisabledEnd: palette.button.elevated.disabledEnd,

    feedbackError: palette.states.error,
    feedbackWarning: palette.states.warning,
    feedbackSuccess: palette.states.success,
    feedbackInfo: palette.states.info,
  },
  spacing: {
    sp3: 3,
    sp5: 5,
    sp7: 7,
    sp10: 10,
    sp12: 12,
    sp15: 15,
    sp16: 16,
    sp17: 17,
    sp20: 20,
    sp23: 23,
    sp25: 25,
    sp28: 28,
    sp40: 40,
    sp48: 48,
    sp50: 50,
    sp60: 60,
    sp80: 80,
  },
  borderRadii: {
    none: 0,
    rd4: 4,
    rd8: 8,
    rd12: 12,
    rd15: 15,
    rd30: 30,
    rd40: 40,
    rd100: 100,
  },
});

export type Theme = typeof theme;
