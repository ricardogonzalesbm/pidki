import Box from "@/components/Box";
import Icon from "@/components/Icon";
import Text from "@/components/Text";
import Button from "@/components/ui/Button/Button";
import { Theme } from "@/theme";
import { useTheme } from "@shopify/restyle";
import { icons } from "lucide-react-native";
import React from "react";

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

const loanReasonLabels: Record<
  LoanReasonType,
  { label: string; icon: keyof typeof icons }
> = {
  homeRepair: { label: "Reparación del hogar", icon: "Hammer" },
  carRepair: { label: "Reparación de auto", icon: "Car" },
  medical: { label: "Médico", icon: "Heart" },
  groceries: { label: "Compras", icon: "ShoppingCart" },
  bills: { label: "Facturas", icon: "Receipt" },
  emergency: { label: "Emergencia", icon: "TriangleAlert" },
  moving: { label: "Mudanza", icon: "Truck" },
  education: { label: "Educación", icon: "GraduationCap" },
  other: { label: "Otro", icon: "Ellipsis" },
};

interface LoanRequestBidCardProps {
  amountRequested: number;
  loanReason: LoanReasonType;
  userScore: number;
  numberOfPayments: number;
  onPlaceBid?: () => void;
}

export default function LoanRequestBidCard({
  amountRequested,
  loanReason,
  userScore,
  numberOfPayments,
  onPlaceBid,
}: LoanRequestBidCardProps) {
  const theme = useTheme<Theme>();
  const reasonData = loanReasonLabels[loanReason];

  return (
    <Box
      backgroundColor="white"
      borderRadius={16}
      borderWidth={1}
      borderColor="border"
      padding="l"
    >
      {/* Amount Requested */}
      <Box marginBottom="m">
        <Text variant="caption" marginBottom="xs">
          Cantidad Solicitada
        </Text>
        <Text
          variant="header"
          style={{
            fontSize: 32,
            fontFamily: "Quicksand-Bold",
            color: theme.colors.primary,
          }}
        >
          S/{" "}
          {amountRequested.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Text>
      </Box>

      {/* Divider */}
      <Box height={1} backgroundColor="border" marginBottom="m" />

      {/* Loan Details */}
      <Box gap="m" marginBottom="l">
        {/* Loan Reason */}
        <Box flexDirection="row" alignItems="center" gap="m">
          <Box
            backgroundColor="tertiary"
            borderRadius={8}
            padding="s"
            width={40}
            height={40}
            alignItems="center"
            justifyContent="center"
          >
            <Icon name={reasonData.icon} size={20} color="primary" />
          </Box>
          <Box flex={1}>
            <Text variant="caption" marginBottom="xs">
              Motivo del Préstamo
            </Text>
            <Text
              variant="body"
              style={{
                fontFamily: "Quicksand-SemiBold",
              }}
            >
              {reasonData.label}
            </Text>
          </Box>
        </Box>

        {/* Score and Payments Row */}
        <Box flexDirection="row" gap="m">
          {/* User Score */}
          <Box flex={1}>
            <Text variant="caption" marginBottom="xs">
              Pidki Score
            </Text>
            <Box flexDirection="row" alignItems="center" gap="s">
              <Box
                backgroundColor="fourty"
                borderRadius={20}
                width={36}
                height={36}
                alignItems="center"
                justifyContent="center"
              >
                <Text
                  variant="danger"
                  style={{
                    fontFamily: "Quicksand-Bold",
                    color: theme.colors.danger,
                  }}
                >
                  {userScore}
                </Text>
              </Box>
              <Text
                variant="body"
                style={{
                  fontFamily: "Quicksand-SemiBold",
                  color: theme.colors.primary,
                }}
              >
                / 100
              </Text>
            </Box>
          </Box>

          {/* Number of Payments */}
          <Box flex={1}>
            <Text variant="caption" marginBottom="xs">
              Cuotas
            </Text>
            <Text
              variant="subheader"
              style={{
                fontFamily: "Quicksand-Bold",
                color: theme.colors.primary,
              }}
            >
              {numberOfPayments} {numberOfPayments === 1 ? "mes" : "meses"}
            </Text>
          </Box>
        </Box>
      </Box>

      {/* CTA Button */}
      <Button variant="primary" fullWidth onPress={onPlaceBid}>
        Place Bid
      </Button>
    </Box>
  );
}
