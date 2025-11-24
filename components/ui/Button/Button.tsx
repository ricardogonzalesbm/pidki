import React from 'react';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { icons } from 'lucide-react-native';
import Box from '@/components/Box';
import Text from '@/components/Text';
import Icon from '@/components/Icon';
import { Theme } from '@/theme';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'warning';
type ButtonSize = 'small' | 'medium' | 'large';
type IconPosition = 'left' | 'right';

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
    paddingVertical: 's' as const,
    paddingHorizontal: 'm' as const,
    fontSize: 14,
    iconSize: 16,
  },
  medium: {
    paddingVertical: 'm' as const,
    paddingHorizontal: 'l' as const,
    fontSize: 16,
    iconSize: 20,
  },
  large: {
    paddingVertical: 'l' as const,
    paddingHorizontal: 'xl' as const,
    fontSize: 18,
    iconSize: 24,
  },
};

const variantConfig: Record<
  ButtonVariant,
  {
    backgroundColor: keyof Theme['colors'];
    textColor: keyof Theme['colors'];
    borderColor?: keyof Theme['colors'];
  }
> = {
  primary: {
    backgroundColor: 'buttonPrimary',
    textColor: 'buttonPrimaryText',
  },
  secondary: {
    backgroundColor: 'buttonSecondary',
    textColor: 'buttonSecondaryText',
  },
  tertiary: {
    backgroundColor: 'buttonTertiary',
    textColor: 'buttonTertiaryText',
    borderColor: 'buttonTertiaryText',
  },
  danger: {
    backgroundColor: 'buttonDanger',
    textColor: 'buttonDangerText',
  },
  warning: {
    backgroundColor: 'buttonWarning',
    textColor: 'buttonWarningText',
  },
};

export default function Button({
  children,
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'left',
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
          style={{ marginRight: iconPosition === 'left' ? 8 : 0, marginLeft: iconPosition === 'right' ? 8 : 0 }}
        />
      );
    }

    if (icon) {
      return (
        <Box marginRight={iconPosition === 'left' ? 's' : undefined} marginLeft={iconPosition === 'right' ? 's' : undefined}>
          <Icon name={icon} size={sizeStyles.iconSize} color={variantStyles.textColor} />
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
      style={{ width: fullWidth ? '100%' : undefined }}
    >
      <Box
        backgroundColor={variantStyles.backgroundColor}
        paddingVertical={sizeStyles.paddingVertical}
        paddingHorizontal={sizeStyles.paddingHorizontal}
        borderRadius={999}
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        opacity={disabled ? 0.5 : 1}
        borderWidth={variant === 'tertiary' ? 2 : 0}
        borderColor={variantStyles.borderColor}
      >
        {(icon || loading) && iconPosition === 'left' && renderIcon()}
        <Text
          variant="body"
          style={{
            fontSize: sizeStyles.fontSize,
            fontWeight: '600',
            color: theme.colors[variantStyles.textColor],
          }}
        >
          {children}
        </Text>
        {(icon || loading) && iconPosition === 'right' && renderIcon()}
      </Box>
    </TouchableOpacity>
  );
}
