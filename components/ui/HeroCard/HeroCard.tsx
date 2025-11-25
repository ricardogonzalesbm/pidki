import Box from "@/components/Box";
import Icon from "@/components/Icon";
import Text from "@/components/Text";
import Button from "@/components/ui/Button/Button";
import ProgressBar from "@/components/ui/ProgressBar/ProgressBar";
import { Theme } from "@/theme";
import { useTheme } from "@shopify/restyle";
import { icons } from "lucide-react-native";
import React from "react";
import { Dimensions, Image } from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

type HeroVariant = "A" | "B" | "C" | "D" | "E" | "F";

interface HeroCardProps {
  variant: HeroVariant;
  title?: string;
  description?: string;
  icon?: keyof typeof icons;
  image?: any; // For require() images
  emoji?: string;
  ctaText?: string;
  onCtaPress?: () => void;
  progress?: number; // For variant F
}

export default function HeroCard({
  variant,
  title,
  description,
  icon,
  image,
  emoji,
  ctaText = "Get Started",
  onCtaPress,
  progress = 0,
}: HeroCardProps) {
  const theme = useTheme<Theme>();

  // Variant A: Typical size, tertiary bg, icon, title, description, primary button
  if (variant === "A") {
    return (
      <Box
        backgroundColor="tertiary"
        paddingVertical="xl"
        paddingHorizontal="l"
      >
        {icon && (
          <Box alignItems="center" marginBottom="m">
            <Icon name={icon} size={64} color="primary" />
          </Box>
        )}
        {title && (
          <Text
            variant="header"
            style={{
              textAlign: "center",
              marginBottom: 12,
            }}
          >
            {title}
          </Text>
        )}
        {description && (
          <Text
            variant="body"
            style={{
              textAlign: "center",
              marginBottom: 24,
            }}
          >
            {description}
          </Text>
        )}
        <Button variant="primary" onPress={onCtaPress} fullWidth>
          {ctaText}
        </Button>
      </Box>
    );
  }

  // Variant B: 50% height, primary bg, image, description, tertiary button
  if (variant === "B") {
    return (
      <Box
        backgroundColor="primary"
        paddingVertical="xl"
        paddingHorizontal="l"
        style={{ minHeight: SCREEN_HEIGHT * 0.5 }}
        justifyContent="center"
      >
        {image && (
          <Box alignItems="center" marginBottom="l">
            <Image
              source={image}
              style={{ width: 120, height: 120 }}
              resizeMode="contain"
            />
          </Box>
        )}
        {description && (
          <Text
            variant="body"
            style={{
              textAlign: "center",
              marginBottom: 24,
              color: theme.colors.white,
            }}
          >
            {description}
          </Text>
        )}
        <Button variant="secondary" onPress={onCtaPress} fullWidth>
          {ctaText}
        </Button>
      </Box>
    );
  }

  // Variant C: 50% height, primary bg, title, description, tertiary button
  if (variant === "C") {
    return (
      <Box
        backgroundColor="primary"
        paddingVertical="xl"
        paddingHorizontal="l"
        style={{ minHeight: SCREEN_HEIGHT * 0.5 }}
        justifyContent="center"
      >
        {title && (
          <Text
            variant="header"
            style={{
              textAlign: "center",
              marginBottom: 12,
              color: theme.colors.white,
            }}
          >
            {title}
          </Text>
        )}
        {description && (
          <Text
            variant="body"
            style={{
              textAlign: "center",
              marginBottom: 24,
              color: theme.colors.white,
            }}
          >
            {description}
          </Text>
        )}
        <Button variant="secondary" onPress={onCtaPress} fullWidth>
          {ctaText}
        </Button>
      </Box>
    );
  }

  // Variant D: Typical size, primary bg, emoji, white title, white description, white button
  if (variant === "D") {
    return (
      <Box backgroundColor="primary" paddingVertical="xl" paddingHorizontal="l">
        {emoji && (
          <Box alignItems="center" marginBottom="m">
            <Text variant="header" style={{ fontSize: 64 }}>
              {emoji}
            </Text>
          </Box>
        )}
        {title && (
          <Text
            variant="header"
            style={{
              textAlign: "center",
              marginBottom: 12,
              color: theme.colors.white,
            }}
          >
            {title}
          </Text>
        )}
        {description && (
          <Text
            variant="body"
            style={{
              textAlign: "center",
              marginBottom: 24,
              color: theme.colors.white,
            }}
          >
            {description}
          </Text>
        )}
        <Box
          backgroundColor="white"
          borderRadius={999}
          paddingVertical="m"
          paddingHorizontal="l"
        >
          <Text
            variant="body"
            style={{
              textAlign: "center",
              fontFamily: "Quicksand-SemiBold",
              color: theme.colors.primary,
            }}
          >
            {ctaText}
          </Text>
        </Box>
      </Box>
    );
  }

  // Variant E: Typical size, tertiary bg, icon, primary title, primary description, primary button
  if (variant === "E") {
    return (
      <Box
        backgroundColor="tertiary"
        paddingVertical="xl"
        paddingHorizontal="l"
      >
        {icon && (
          <Box alignItems="center" marginBottom="m">
            <Icon name={icon} size={64} color="primary" />
          </Box>
        )}
        {title && (
          <Text
            variant="header"
            style={{
              textAlign: "center",
              marginBottom: 12,
              color: theme.colors.primary,
            }}
          >
            {title}
          </Text>
        )}
        {description && (
          <Text
            variant="body"
            style={{
              textAlign: "center",
              marginBottom: 24,
              color: theme.colors.primary,
            }}
          >
            {description}
          </Text>
        )}
        <Button variant="primary" onPress={onCtaPress} fullWidth>
          {ctaText}
        </Button>
      </Box>
    );
  }

  // Variant F: Typical size, tertiary bg, primary description, primary title, progress bar, primary button
  if (variant === "F") {
    return (
      <Box backgroundColor="gray100" paddingVertical="xl" paddingHorizontal="l">
        {description && (
          <Text
            variant="body"
            style={{
              textAlign: "center",
              marginBottom: 8,
              color: theme.colors.primary,
            }}
          >
            {description}
          </Text>
        )}
        {title && (
          <Text
            variant="header"
            style={{
              textAlign: "center",
              marginBottom: 16,
              color: theme.colors.primary,
            }}
          >
            {title}
          </Text>
        )}
        <Box marginBottom="l">
          <ProgressBar progress={progress} showPercentage={false} />
        </Box>
        <Button variant="primary" onPress={onCtaPress} fullWidth>
          {ctaText}
        </Button>
      </Box>
    );
  }

  return null;
}
