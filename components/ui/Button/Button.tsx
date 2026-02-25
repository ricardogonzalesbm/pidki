import Box from "@/components/Box";
import Icon from "@/components/Icon";
import Text from "@/components/Text";
import { Theme } from "@/theme";
import { useTheme } from "@shopify/restyle";
import { icons } from "lucide-react-native";
import React from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "fourty"
  | "outline"
  | "danger"
  | "warning";
type ButtonSize = "small" | "medium" | "large";
type IconPosition = "left" | "right";

interface ButtonProps {
  children: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: keyof typeof icons;
  iconPosition?: IconPosition;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

const sizeConfig = {
  small: {
    paddingVertical: "s" as const,
    paddingHorizontal: "m" as const,
    fontSize: 14,
    iconSize: 16,
  },
  medium: {
    paddingVertical: "m" as const,
    paddingHorizontal: "l" as const,
    fontSize: 16,
    iconSize: 20,
  },
  large: {
    paddingVertical: "l" as const,
    paddingHorizontal: "xl" as const,
    fontSize: 18,
    iconSize: 24,
  },
};

const variantConfig: Record<
  ButtonVariant,
  {
    backgroundColor: keyof Theme["colors"];
    textColor: keyof Theme["colors"];
    borderColor?: keyof Theme["colors"];
  }
> = {
  primary: {
    backgroundColor: "buttonPrimary",
    textColor: "buttonPrimaryText",
  },
  secondary: {
    backgroundColor: "buttonSecondary",
    textColor: "buttonSecondaryText",
  },
  tertiary: {
    backgroundColor: "buttonTertiary",
    textColor: "buttonTertiaryText",
    borderColor: "buttonTertiaryText",
  },
  fourty: {
    backgroundColor: "buttonFourty",
    textColor: "buttonFourtyText",
    borderColor: "buttonFourtyBorder",
  },
  outline: {
    backgroundColor: "buttonOutline",
    textColor: "buttonOutlineText",
    borderColor: "buttonOutlineText",
  },
  danger: {
    backgroundColor: "buttonDanger",
    textColor: "buttonDangerText",
  },
  warning: {
    backgroundColor: "buttonWarning",
    textColor: "buttonWarningText",
  },
};

export default function Button({
  children,
  variant = "primary",
  size = "medium",
  icon,
  iconPosition = "left",
  onPress,
  disabled = false,
  loading = false,
  fullWidth = false,
}: ButtonProps) {
  const theme = useTheme<Theme>();
  const sizeStyles = sizeConfig[size];
  const variantStyles = variantConfig[variant];

  const renderIcon = () => {
    if (loading) {
      return (
        <ActivityIndicator
          size="small"
          color={theme.colors[variantStyles.textColor]}
          style={{
            marginRight: iconPosition === "left" ? 8 : 0,
            marginLeft: iconPosition === "right" ? 8 : 0,
          }}
        />
      );
    }

    if (icon) {
      return (
        <Box
          marginRight={iconPosition === "left" ? "s" : undefined}
          marginLeft={iconPosition === "right" ? "s" : undefined}
        >
          <Icon
            name={icon}
            size={sizeStyles.iconSize}
            color={variantStyles.textColor}
          />
        </Box>
      );
    }

    return null;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={{ width: fullWidth ? "100%" : undefined }}
    >
      <Box
        backgroundColor={variantStyles.backgroundColor}
        paddingVertical={sizeStyles.paddingVertical}
        paddingHorizontal={sizeStyles.paddingHorizontal}
        borderRadius={999}
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        borderWidth={variant === "fourty" || variant === "outline" ? 2 : 0}
        borderColor={variantStyles.borderColor}
      >
        {(icon || loading) && iconPosition === "left" && renderIcon()}
        <Text
          variant="body"
          style={{
            fontSize: sizeStyles.fontSize,
            fontFamily: "PlusJakartaSans-SemiBold",
            color: theme.colors[variantStyles.textColor],
          }}
        >
          {children}
        </Text>
        {(icon || loading) && iconPosition === "right" && renderIcon()}
      </Box>
    </TouchableOpacity>
  );
}
