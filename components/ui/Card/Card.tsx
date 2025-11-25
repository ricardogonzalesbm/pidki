import Box from "@/components/Box";
import Text from "@/components/Text";
import Button from "@/components/ui/Button/Button";
import React from "react";

interface CardProps {
  totalPayback: number;
  interestRate: number;
  monthlyPayment: number;
  paymentPeriodMonths: number;
  validThrough: string;
  badgeText?: string;
  onAccept?: () => void;
}

export default function Card({
  totalPayback,
  interestRate,
  monthlyPayment,
  paymentPeriodMonths,
  validThrough,
  badgeText,
  onAccept,
}: CardProps) {
  return (
    <Box
      backgroundColor="mainBackground"
      borderRadius={16}
      borderWidth={1}
      borderColor="border"
      position="relative"
      overflow="hidden"
    >
      {badgeText && (
        <Box
          position="absolute"
          top={0}
          right={0}
          backgroundColor="buttonWarning"
          paddingHorizontal="m"
          paddingVertical="xs"
          borderBottomLeftRadius={6}
        >
          <Text
            variant="caption"
            style={{
              color: "#FFFFFF",
              fontFamily: "Quicksand-SemiBold",
              fontSize: 12,
              textTransform: "uppercase",
            }}
          >
            {badgeText}
          </Text>
        </Box>
      )}

      <Box>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box style={{ flex: 0.7 }} padding="l" paddingBottom="m">
            <Text variant="caption" marginBottom="xs">
              Total Payback
            </Text>
            <Text
              variant="header"
              style={{
                fontSize: 28,
                fontFamily: "Quicksand-Bold",
              }}
            >
              S/{" "}
              {totalPayback.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          </Box>

          <Box width={1} alignSelf="stretch" backgroundColor="border" />

          <Box style={{ flex: 0.3 }} alignItems="center">
            <Text variant="caption" marginBottom="xs">
              Interés
            </Text>
            <Text
              variant="subheader"
              style={{
                fontSize: 24,
                fontFamily: "Quicksand-SemiBold",
                color: "#2DD4BF",
              }}
            >
              {interestRate}%
            </Text>
          </Box>
        </Box>
      </Box>

      <Box height={1} backgroundColor="border" />

      <Box padding="l">
        <Box
          backgroundColor="gray100"
          padding="m"
          borderRadius={8}
          marginBottom="m"
        >
          <Text variant="body" style={{ lineHeight: 22 }}>
            You'll payback{" "}
            <Text variant="body" style={{ fontFamily: "Quicksand-Bold" }}>
              S/{" "}
              {monthlyPayment.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>{" "}
            every month. Your loan will be paid off in{" "}
            <Text variant="body" style={{ fontFamily: "Quicksand-Bold" }}>
              {paymentPeriodMonths}{" "}
              {paymentPeriodMonths === 1 ? "month" : "months"}
            </Text>
            .
          </Text>
        </Box>

        <Button variant="primary" fullWidth onPress={onAccept} size="medium">
          Accept Offer
        </Button>

        <Text
          variant="caption"
          style={{
            textAlign: "center",
            marginTop: 12,
            color: "#2DD4BF",
            fontSize: 12,
          }}
        >
          Valid through {validThrough}
        </Text>
      </Box>
    </Box>
  );
}
