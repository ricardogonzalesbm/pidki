import React, { useEffect } from "react";
import { useTheme } from "@shopify/restyle";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import Box from "@/components/Box";
import Text from "@/components/Text";
import { Theme } from "@/theme";

interface ProgressBarProps {
  progress: number; // Value between 0 and 100
  label?: string;
  showPercentage?: boolean;
}

export default function ProgressBar({
  progress,
  label,
  showPercentage = true,
}: ProgressBarProps) {
  const theme = useTheme<Theme>();
  const animatedWidth = useSharedValue(0);

  // Clamp progress between 0 and 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  useEffect(() => {
    animatedWidth.value = withTiming(clampedProgress, {
      duration: 1000,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [clampedProgress]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${animatedWidth.value}%`,
  }));

  return (
    <Box>
      {(label || showPercentage) && (
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginBottom="xs"
        >
          {label && (
            <Text variant="body" style={{ fontFamily: "Quicksand-SemiBold" }}>
              {label}
            </Text>
          )}
          {showPercentage && (
            <Text
              variant="body"
              style={{ fontFamily: "Quicksand-SemiBold", color: theme.colors.buttonPrimary }}
            >
              {Math.round(clampedProgress)}%
            </Text>
          )}
        </Box>
      )}

      <Box
        height={12}
        backgroundColor="gray100"
        borderRadius={6}
        overflow="hidden"
      >
        <Animated.View
          style={[
            {
              height: "100%",
              backgroundColor: theme.colors.buttonPrimary,
              borderRadius: 6,
            },
            animatedStyle,
          ]}
        />
      </Box>
    </Box>
  );
}
