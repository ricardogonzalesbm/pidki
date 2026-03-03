import Box from "@/components/Box";
import Text from "@/components/Text";
import Button from "@/components/ui/Button/Button";
import theme from "@/theme";
import { Check } from "lucide-react-native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useCardsStepper } from "./CardsStepperContext";

const { colors } = theme;

interface CardStepperItemProps {
  stepNumber: number;
  totalSteps: number;
  stepLabel: string;
  title: string;
  isSubmittable: boolean;
  ChildComponent: React.ComponentType;
  isFirst: boolean;
  isLast: boolean;
}

export default function CardStepperItem({
  stepNumber,
  totalSteps,
  stepLabel,
  title,
  isSubmittable,
  ChildComponent,
  isFirst,
  isLast,
}: CardStepperItemProps) {
  const { activeStep, stepsSubmitted, submitActiveStep, goToPreviousStep } =
    useCardsStepper();

  const isActive = activeStep === stepNumber;
  const isCompleted = stepsSubmitted.includes(stepNumber);

  // Later steps overlap earlier ones, so higher stepNumber = higher zIndex
  // Active step always floats on top
  const zIndex = isActive ? totalSteps + 10 : stepNumber;

  return (
    <View
      style={{
        backgroundColor: colors.white,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderBottomLeftRadius: isLast ? 16 : 0,
        borderBottomRightRadius: isLast ? 16 : 0,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: colors.gray200,
        borderBottomColor: colors.gray200,
        marginTop: isFirst ? 0 : -12,
        zIndex,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: zIndex,
      }}
    >
      {/* Header — always visible */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {}}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: theme.spacing.l,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Box gap="xs">
            <Text
              variant="subtitle"
              style={{
                fontFamily: "PlusJakartaSans-SemiBold",
                color: colors.gray500,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              {stepLabel}
            </Text>
            <Text
              variant="subheader"
              style={{
                fontFamily: "PlusJakartaSans-Bold",
                fontSize: 18,
                color: colors.darkNavyBlue,
              }}
            >
              {title}
            </Text>
          </Box>
        </View>

        <View
          style={{
            width: 28,
            height: 28,
            borderRadius: 14,
            backgroundColor: isCompleted
              ? colors.primary
              : isActive
                ? colors.white
                : colors.gray200,
            borderWidth: isActive ? 2 : 0,
            borderColor: isActive ? colors.primary : "transparent",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Check
            size={16}
            strokeWidth={2.5}
            color={isActive ? colors.primary : colors.darkNavyBlue}
          />
        </View>
      </TouchableOpacity>

      {/* Content — only visible when active */}
      {isActive && (
        <View
          style={{
            paddingHorizontal: theme.spacing.l,
            paddingBottom: theme.spacing.l,
          }}
        >
          {/* Divider */}
          <View
            style={{
              height: 1,
              backgroundColor: colors.gray200,
              marginBottom: theme.spacing.l,
            }}
          />

          <ChildComponent />

          {isSubmittable && (
            <View
              style={{
                flexDirection: "row",
                gap: theme.spacing.s,
                marginTop: theme.spacing.m,
              }}
            >
              {!isFirst && (
                <View style={{ flex: 1 }}>
                  <Button
                    variant="outline"
                    fullWidth
                    onPress={goToPreviousStep}
                  >
                    ATRÁS
                  </Button>
                </View>
              )}
              <View style={{ flex: 1 }}>
                <Button
                  variant="primary"
                  fullWidth
                  onPress={() => submitActiveStep()}
                >
                  SEGUIR
                </Button>
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
}
