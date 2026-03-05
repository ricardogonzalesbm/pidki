import theme from "@/theme";

const { colors } = theme;

export type HeaderNavVariant =
  | "defaults"
  | "dark"
  | "primary"
  | "darkBase"
  | "black"
  | "white";

export interface HeaderNavVariantConfig {
  backgroundColor: string;
  iconBackground: string;
  iconColor: string;
  titleColor: string;
  activeColor: string;
  centerIcon?: string;
  leftIcons: boolean;
}

const defaultVariant: HeaderNavVariantConfig = {
  backgroundColor: colors.mainBackground,
  iconBackground: colors.gray200,
  iconColor: colors.gray900,
  titleColor: colors.gray900,
  activeColor: colors.primary,
  leftIcons: true,
};

export const headerNavVariants: Record<HeaderNavVariant, HeaderNavVariantConfig> = {
  defaults: defaultVariant,
  dark: {
    ...defaultVariant,
    backgroundColor: colors.darkNavyBlue,
    iconBackground: "rgba(255, 255, 255, 0.1)",
    iconColor: colors.white,
    titleColor: colors.white,
  },
  primary: {
    ...defaultVariant,
    backgroundColor: colors.primary,
    iconBackground: "rgba(255, 255, 255, 0.35)",
    iconColor: colors.darkNavyBlue,
    titleColor: colors.darkNavyBlue,
    activeColor: colors.darkNavyBlue,
  },
  darkBase: {
    ...defaultVariant,
    backgroundColor: colors.darkNavyBlue,
    iconBackground: "rgba(255, 255, 255, 0.1)",
    iconColor: colors.gray100,
    titleColor: colors.gray100,
  },
  black: {
    ...defaultVariant,
    backgroundColor: colors.darkNavyBlue,
    iconBackground: colors.darkNavyBlue,
    iconColor: colors.primary,
    titleColor: colors.white,
    leftIcons: false,
  },
  white: {
    ...defaultVariant,
    backgroundColor: colors.white,
    iconBackground: colors.gray100,
    iconColor: colors.gray900,
    titleColor: colors.gray900,
    leftIcons: false,
  },
};
