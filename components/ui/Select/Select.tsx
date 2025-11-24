import Box from "@/components/Box";
import Icon from "@/components/Icon";
import Text from "@/components/Text";
import { Theme } from "@/theme";
import { useTheme } from "@shopify/restyle";
import React, { useState } from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  onSelect?: (value: string) => void;
  label?: string;
}

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Select({
  options,
  value,
  placeholder = "Seleccionar...",
  onSelect,
  label,
}: SelectProps) {
  const theme = useTheme<Theme>();
  const [isOpen, setIsOpen] = useState(false);
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const opacity = useSharedValue(0);

  const selectedOption = options.find((opt) => opt.value === value);

  const openModal = () => {
    setIsOpen(true);
    opacity.value = withTiming(1, { duration: 250 });
    translateY.value = withTiming(0, {
      duration: 300,
    });
  };

  const closeModal = () => {
    opacity.value = withTiming(0, { duration: 200 });
    translateY.value = withTiming(SCREEN_HEIGHT, { duration: 200 });
    setTimeout(() => setIsOpen(false), 200);
  };

  const handleSelect = (optionValue: string) => {
    onSelect?.(optionValue);
    closeModal();
  };

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const bottomSheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <>
      <Box>
        {label && (
          <Text variant="body" marginBottom="xs" style={{ fontWeight: "400" }}>
            {label}
          </Text>
        )}
        <TouchableOpacity onPress={openModal} activeOpacity={0.7}>
          <Box
            backgroundColor="mainBackground"
            borderRadius={12}
            borderWidth={1}
            borderColor="border"
            paddingHorizontal="m"
            paddingVertical="m"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text
              variant="body"
              style={{
                fontWeight: "600",
                color: selectedOption
                  ? theme.colors.buttonPrimary
                  : theme.colors.primary,
              }}
            >
              {selectedOption ? selectedOption.label : placeholder}
            </Text>
            <Icon name="ChevronDown" size={20} color="primary" />
          </Box>
        </TouchableOpacity>
      </Box>

      <Modal
        visible={isOpen}
        transparent
        animationType="none"
        onRequestClose={closeModal}
        statusBarTranslucent
      >
        <Box flex={1}>
          <Animated.View style={[{ flex: 1 }, backdropStyle]}>
            <Pressable
              style={{
                flex: 1,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
              onPress={closeModal}
            />
          </Animated.View>

          <Animated.View
            style={[
              {
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: theme.colors.mainBackground,
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                maxHeight: SCREEN_HEIGHT * 0.7,
              },
              bottomSheetStyle,
            ]}
          >
            <Box padding="l">
              <Box alignItems="center" marginBottom="m" paddingVertical="xs">
                <Box
                  width={40}
                  height={4}
                  backgroundColor="border"
                  borderRadius={2}
                />
              </Box>

              <Text
                variant="subheader"
                marginBottom="m"
                style={{ fontWeight: "600" }}
              >
                {label || "Seleccionar opción"}
              </Text>

              <ScrollView
                style={{ maxHeight: SCREEN_HEIGHT * 0.5 }}
                showsVerticalScrollIndicator={false}
              >
                {options.map((option) => {
                  const isSelected = option.value === value;
                  return (
                    <TouchableOpacity
                      key={option.value}
                      onPress={() => handleSelect(option.value)}
                      activeOpacity={0.7}
                    >
                      <Box
                        backgroundColor={
                          isSelected ? "buttonPrimary" : "gray100"
                        }
                        padding="m"
                        borderRadius={12}
                        marginBottom="s"
                        flexDirection="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Text
                          variant="body"
                          style={{
                            fontWeight: "600",
                            color: isSelected
                              ? theme.colors.buttonPrimaryText
                              : theme.colors.buttonPrimary,
                          }}
                        >
                          {option.label}
                        </Text>
                        {isSelected && (
                          <Icon
                            name="Check"
                            size={20}
                            color="buttonPrimaryText"
                          />
                        )}
                      </Box>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </Box>
          </Animated.View>
        </Box>
      </Modal>
    </>
  );
}
