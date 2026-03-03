import Box from "@/components/Box";
import Text from "@/components/Text";
import { Theme } from "@/theme";
import { useTheme } from "@shopify/restyle";
import { useRef } from "react";
import { LayoutChangeEvent } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const THUMB_SIZE = 28;
const TRACK_HEIGHT = 4;

export type RangeSliderProps = {
  value: number;
  minValue?: number;
  maxValue?: number;
  sliderRange: { min: number; max: number };
  increment?: number;
  leftText?: string;
  rightText?: string;
  onChange?: (value: number) => void;
};

export default function RangeSlider({
  value,
  sliderRange,
  increment = 1,
  leftText,
  rightText,
  onChange,
}: RangeSliderProps) {
  const theme = useTheme<Theme>();
  const trackWidth = useSharedValue(0);
  const thumbX = useSharedValue(0);
  const startX = useSharedValue(0);
  const initialized = useRef(false);

  const rangeMin = sliderRange.min;
  const rangeMax = sliderRange.max;

  const valueToPosition = (val: number, width: number) => {
    "worklet";
    const ratio = (val - rangeMin) / (rangeMax - rangeMin);
    return ratio * (width - THUMB_SIZE);
  };

  const positionToValue = (pos: number, width: number) => {
    "worklet";
    const ratio = pos / (width - THUMB_SIZE);
    const raw = ratio * (rangeMax - rangeMin) + rangeMin;
    const stepped = Math.round(raw / increment) * increment;
    return Math.min(rangeMax, Math.max(rangeMin, stepped));
  };

  const handleLayout = (e: LayoutChangeEvent) => {
    const width = e.nativeEvent.layout.width;
    trackWidth.value = width;
    if (!initialized.current) {
      thumbX.value = valueToPosition(value, width);
      initialized.current = true;
    }
  };

  const gesture = Gesture.Pan()
    .onStart(() => {
      startX.value = thumbX.value;
    })
    .onUpdate((e) => {
      const width = trackWidth.value;
      if (width === 0) return;
      const newX = Math.min(
        width - THUMB_SIZE,
        Math.max(0, startX.value + e.translationX),
      );
      thumbX.value = newX;
      if (onChange) {
        const newValue = positionToValue(newX, width);
        runOnJS(onChange)(newValue);
      }
    });

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: thumbX.value }],
  }));

  const fillStyle = useAnimatedStyle(() => ({
    width: thumbX.value + THUMB_SIZE / 2,
  }));

  return (
    <Box width="100%">
      <GestureHandlerRootView>
        <Box
          width="100%"
          height={THUMB_SIZE}
          justifyContent="center"
          onLayout={handleLayout}
        >
          <Box
            position="absolute"
            height={TRACK_HEIGHT}
            backgroundColor="gray200"
            borderRadius={TRACK_HEIGHT / 2}
            style={{ left: THUMB_SIZE / 2, right: THUMB_SIZE / 2 }}
          />

          <Animated.View
            style={[
              {
                position: "absolute",
                left: THUMB_SIZE / 2,
                height: TRACK_HEIGHT,
                borderRadius: TRACK_HEIGHT / 2,
                backgroundColor: theme.colors.primary,
              },
              fillStyle,
            ]}
          />

          <GestureDetector gesture={gesture}>
            <Animated.View
              style={[
                {
                  position: "absolute",
                  width: THUMB_SIZE,
                  height: THUMB_SIZE,
                  borderRadius: THUMB_SIZE / 2,
                  borderWidth: 3,
                  backgroundColor: theme.colors.primary,
                  borderColor: theme.colors.white,
                  shadowColor: theme.colors.black,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 4,
                  elevation: 4,
                },
                thumbStyle,
              ]}
            />
          </GestureDetector>
        </Box>
      </GestureHandlerRootView>

      {(leftText || rightText) && (
        <Box flexDirection="row" justifyContent="space-between" marginTop="s">
          {leftText && (
            <Text variant="subtitle" color="gray500">
              {leftText}
            </Text>
          )}
          {rightText && (
            <Text variant="subtitle" color="gray500">
              {rightText}
            </Text>
          )}
        </Box>
      )}
    </Box>
  );
}
