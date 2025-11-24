import React from 'react';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { icons } from 'lucide-react-native';
import Box from '@/components/Box';
import Icon from '@/components/Icon';
import { Theme } from '@/theme';

type IconButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'warning';
type IconButtonSize = 'small' | 'medium' | 'large';

interface IconButtonProps {
  icon: keyof typeof icons;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const sizeConfig = {
  small: {
    size: 48,
    iconSize: 24,
    borderRadius: 10,
  },
  medium: {
    size: 56,
    iconSize: 28,
    borderRadius: 12,
  },
  large: {
    size: 64,
    iconSize: 32,
    borderRadius: 14,
  },
};

const variantConfig: Record<
  IconButtonVariant,
  {
    backgroundColor: keyof Theme['colors'];
    iconColor: keyof Theme['colors'];
    borderColor?: keyof Theme['colors'];
  }
> = {
  primary: {
    backgroundColor: 'buttonPrimary',
    iconColor: 'buttonPrimaryText',
  },
  secondary: {
    backgroundColor: 'buttonSecondary',
    iconColor: 'buttonSecondaryText',
  },
  tertiary: {
    backgroundColor: 'buttonTertiary',
    iconColor: 'buttonTertiaryText',
    borderColor: 'buttonTertiaryText',
  },
  danger: {
    backgroundColor: 'buttonDanger',
    iconColor: 'buttonDangerText',
  },
  warning: {
    backgroundColor: 'buttonWarning',
    iconColor: 'buttonWarningText',
  },
};

export default function IconButton({
  icon,
  variant = 'primary',
  size = 'medium',
  onPress,
  disabled = false,
  loading = false,
}: IconButtonProps) {
  const theme = useTheme<Theme>();
  const sizeStyles = sizeConfig[size];
  const variantStyles = variantConfig[variant];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      <Box
        backgroundColor={variantStyles.backgroundColor}
        width={sizeStyles.size}
        height={sizeStyles.size}
        borderRadius={sizeStyles.borderRadius}
        alignItems="center"
        justifyContent="center"
        opacity={disabled ? 0.5 : 1}
        borderWidth={variant === 'tertiary' ? 2 : 0}
        borderColor={variantStyles.borderColor}
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            color={theme.colors[variantStyles.iconColor]}
          />
        ) : (
          <Icon name={icon} size={sizeStyles.iconSize} color={variantStyles.iconColor} />
        )}
      </Box>
    </TouchableOpacity>
  );
}
