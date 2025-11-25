import { createTheme } from '@shopify/restyle';

const palette = {
  primary: '#18233a',
  secondary: '#667bab',
  tertiary: '#bdcae7',
  fourty: '#f3d3e0',
  cyan: '#2DD4BF',
  white: '#FFFFFF',
  black: '#000000',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
  red400: '#f3bdbdff',
  red500: '#EF4444',
  red600: '#DC2626',
  yellow500: '#EBC106',
  yellow600: '#D97706',
};

const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    mainForeground: palette.black,
    cardPrimaryBackground: palette.primary,
    cardSecondaryBackground: palette.secondary,
    textPrimary: palette.gray900,
    textSecondary: palette.gray600,
    textInverse: palette.white,
    border: palette.gray200,
    gray100: palette.gray100,
    buttonPrimary: palette.primary,
    buttonPrimaryText: palette.white,
    buttonSecondary: palette.secondary,
    buttonSecondaryText: palette.white,
    buttonTertiary: palette.tertiary,
    buttonTertiaryText: palette.primary,
    buttonFourty: palette.fourty,
    buttonFourtyText: palette.red600,
    buttonFourtyBorder: palette.red400,
    buttonOutline: 'transparent',
    buttonOutlineText: palette.primary,
    buttonDanger: palette.red500,
    buttonDangerText: palette.white,
    buttonWarning: palette.yellow500,
    buttonWarningText: palette.white,
    primary: palette.primary,
    secondary: palette.secondary,
    tertiary: palette.tertiary,
    fourty: palette.fourty,
    white: palette.white,
    cyan: palette.cyan,
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    header: {
      fontSize: 32,
      fontFamily: 'Quicksand-Bold',
      color: 'textPrimary',
    },
    subheader: {
      fontSize: 24,
      fontFamily: 'Quicksand-SemiBold',
      color: 'textPrimary',
    },
    body: {
      fontSize: 16,
      fontFamily: 'Quicksand-Regular',
      color: 'textPrimary',
    },
    caption: {
      fontSize: 14,
      fontFamily: 'Quicksand-Regular',
      color: 'textSecondary',
    },
  },
  cardVariants: {
    defaults: {
      padding: 'm',
      borderRadius: 8,
    },
    primary: {
      backgroundColor: 'cardPrimaryBackground',
    },
    secondary: {
      backgroundColor: 'cardSecondaryBackground',
    },
  },
});

export type Theme = typeof theme;
export default theme;
