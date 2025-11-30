import Box from "@/components/Box";
import Icon from "@/components/Icon";
import Text from "@/components/Text";
import { Theme } from "@/theme";
import { useTheme } from "@shopify/restyle";
import { icons } from "lucide-react-native";
import React, { useState } from "react";
import { TextInput, TextInputProps, TouchableOpacity } from "react-native";

interface TextFieldProps extends Omit<TextInputProps, "placeholderTextColor"> {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  icon?: keyof typeof icons;
  secureTextEntry?: boolean;
  disabled?: boolean;
}

export default function TextField({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  icon,
  secureTextEntry = false,
  disabled = false,
  ...textInputProps
}: TextFieldProps) {
  const theme = useTheme<Theme>();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const hasError = !!error;
  const isPassword = secureTextEntry;

  return (
    <Box marginBottom="m">
      {label && (
        <Text
          variant="body"
          marginBottom="s"
          style={{
            fontFamily: "PlusJakartaSans-SemiBold",
            color: hasError ? theme.colors.red600 : theme.colors.textPrimary,
          }}
        >
          {label}
        </Text>
      )}

      <Box
        flexDirection="row"
        alignItems="center"
        backgroundColor="white"
        borderWidth={2}
        borderColor={hasError ? "red600" : isFocused ? "primary" : "border"}
        borderRadius={12}
        paddingHorizontal="m"
        paddingVertical="m"
        opacity={disabled ? 0.6 : 1}
      >
        {icon && (
          <Box marginRight="s">
            <Icon
              name={icon}
              size={20}
              color={
                hasError ? "red600" : isFocused ? "primary" : "textSecondary"
              }
            />
          </Box>
        )}

        <Box flex={1}>
          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.gray400}
            secureTextEntry={isPassword && !isPasswordVisible}
            editable={!disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={{
              fontFamily: "PlusJakartaSans-Regular",
              fontSize: 16,
              color: theme.colors.textPrimary,
              padding: 0,
              margin: 0,
            }}
            {...textInputProps}
          />
        </Box>

        {isPassword && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon
              name={isPasswordVisible ? "EyeOff" : "Eye"}
              size={20}
              color={isFocused ? "primary" : "textSecondary"}
            />
          </TouchableOpacity>
        )}
      </Box>

      {hasError && (
        <Box marginTop="s" flexDirection="row" alignItems="center">
          <Icon name="CircleAlert" size={14} color="red600" />
          <Text
            variant="caption"
            marginLeft="xs"
            style={{
              color: theme.colors.red600,
              fontSize: 13,
            }}
          >
            {error}
          </Text>
        </Box>
      )}
    </Box>
  );
}
