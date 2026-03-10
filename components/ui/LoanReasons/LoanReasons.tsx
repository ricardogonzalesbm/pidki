import Box from "@/components/Box";
import Icon from "@/components/Icon";
import Text from "@/components/Text";
import theme from "@/theme";
import { icons } from "lucide-react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

export type LoanReasonType =
  | "homeRepair"
  | "carRepair"
  | "medical"
  | "groceries"
  | "bills"
  | "emergency"
  | "moving"
  | "education"
  | "other";

interface LoanReason {
  id: LoanReasonType;
  label: string;
  icon: keyof typeof icons;
}

const loanReasons: LoanReason[] = [
  { id: "homeRepair", label: "Reparación del hogar", icon: "Hammer" },
  { id: "carRepair", label: "Reparación de auto", icon: "Car" },
  { id: "medical", label: "Médico", icon: "Heart" },
  { id: "groceries", label: "Compras", icon: "ShoppingCart" },
  { id: "bills", label: "Facturas", icon: "Receipt" },
  { id: "emergency", label: "Emergencia", icon: "TriangleAlert" },
  { id: "moving", label: "Mudanza", icon: "Truck" },
  { id: "education", label: "Educación", icon: "GraduationCap" },
  { id: "other", label: "Otro", icon: "Ellipsis" },
];

interface LoanReasonsProps {
  onSelectReason?: (reason: LoanReasonType) => void;
  selectedReason?: LoanReasonType;
}

export default function LoanReasons({
  onSelectReason,
  selectedReason,
}: LoanReasonsProps) {
  return (
    <Box gap="s">
      {loanReasons.map((reason) => {
        const isSelected = selectedReason === reason.id;
        return (
          <TouchableOpacity
            key={reason.id}
            onPress={() => onSelectReason?.(reason.id)}
            activeOpacity={0.7}
          >
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              borderRadius={12}
              paddingHorizontal="m"
              paddingVertical="m"
              borderWidth={1.5}
              borderColor={isSelected ? "buttonPrimary" : "gray200"}
              backgroundColor={isSelected ? "buttonPrimary" : "white"}
            >
              <Text
                variant="body"
                style={{
                  fontFamily: isSelected
                    ? "Quicksand-SemiBold"
                    : "Quicksand-Regular",
                  color: isSelected
                    ? theme.colors.darkNavyBlue
                    : theme.colors.gray800,
                }}
              >
                {reason.label}
              </Text>
              <Icon
                name={reason.icon}
                size={26}
                color={isSelected ? "black" : "gray400"}
              />
            </Box>
          </TouchableOpacity>
        );
      })}
    </Box>
  );
}
