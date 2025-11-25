import Box from "@/components/Box";
import Icon from "@/components/Icon";
import Text from "@/components/Text";
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
    <Box
      flexDirection="row"
      flexWrap="wrap"
      gap="m"
      justifyContent="space-between"
    >
      {loanReasons.map((reason) => {
        const isSelected = selectedReason === reason.id;
        return (
          <TouchableOpacity
            key={reason.id}
            onPress={() => onSelectReason?.(reason.id)}
            activeOpacity={0.7}
            style={{ width: "30%" }}
          >
            <Box
              backgroundColor={isSelected ? "buttonPrimary" : "tertiary"}
              borderRadius={12}
              padding="m"
              alignItems="center"
              justifyContent="center"
              minHeight={100}
              borderWidth={isSelected ? 2 : 0}
              borderColor={isSelected ? "buttonPrimary" : undefined}
            >
              <Icon
                name={reason.icon}
                size={32}
                color={isSelected ? "buttonPrimaryText" : "textPrimary"}
              />
              <Text
                variant="caption"
                marginTop="xs"
                style={{
                  textAlign: "center",
                  fontFamily: isSelected
                    ? "Quicksand-SemiBold"
                    : "Quicksand-Regular",
                  color: isSelected ? "#FFFFFF" : "textPrimary",
                }}
              >
                {reason.label}
              </Text>
            </Box>
          </TouchableOpacity>
        );
      })}
    </Box>
  );
}
