import { createTheme } from '@shopify/restyle';

const palette = {
  cyan: '#2DD4BF',
  blue: '#3B82F6',
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
  red500: '#EF4444',
  red600: '#DC2626',
  yellow500: '#F59E0B',
  yellow600: '#D97706',
};

const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    mainForeground: palette.black,
    cardPrimaryBackground: palette.cyan,
    cardSecondaryBackground: palette.blue,
    textPrimary: palette.gray900,
    textSecondary: palette.gray600,
    textInverse: palette.white,
    border: palette.gray200,
    gray100: palette.gray100,
    buttonPrimary: palette.cyan,
    buttonPrimaryText: palette.white,
    buttonSecondary: palette.gray200,
    buttonSecondaryText: palette.gray900,
    buttonTertiary: 'transparent',
    buttonTertiaryText: palette.cyan,
    buttonDanger: palette.red500,
    buttonDangerText: palette.white,
    buttonWarning: palette.yellow500,
    buttonWarningText: palette.white,
    primary: palette.cyan
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
      fontWeight: 'bold',
      color: 'textPrimary',
    },
    subheader: {
      fontSize: 24,
      fontWeight: '600',
      color: 'textPrimary',
    },
    body: {
      fontSize: 16,
      color: 'textPrimary',
    },
    caption: {
      fontSize: 14,
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
