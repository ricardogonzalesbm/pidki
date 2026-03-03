import Box from "@/components/Box";
import Text from "@/components/Text";
import Select, { SelectOption } from "@/components/ui/Select/Select";
import { useState } from "react";
import { useCardsStepper } from "./CardsStepperContext";

const numberOfPaymentsOptions: SelectOption[] = [
  { label: "1 pago", value: "1" },
  { label: "2 pagos", value: "2" },
  { label: "3 pagos", value: "3" },
  { label: "6 pagos", value: "6" },
];

export default function ContentY() {
  const { payload } = useCardsStepper();
  const [selectedPayments, setSelectedPayments] = useState<string>("");

  const totalAmount = Number(payload.loanOfferTotalAmount ?? 0);
  const paymentAmount = Number(payload.loanOfferRequestCard?.paymentAmount ?? 0);
  const weeksToPayOff = payload.loanOfferRequestCard?.weeksToPayOff ?? 6;
  const paybackFrequency =
    payload.loanOfferRequestCard?.paybackFrequencyAmount === "BI_WEEKLY"
      ? "cada dos semanas"
      : "semanalmente";

  const perPaymentAmount =
    selectedPayments && Number(selectedPayments) > 0
      ? totalAmount / Number(selectedPayments)
      : 0;

  const profit = Number(payload.loanOfferProfit ?? 0);

  const formatCurrency = (val: number) =>
    `$${val.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <Box gap="m">
      {/* Informative section */}
      <Text variant="body" color="textSecondary" style={{ lineHeight: 24 }}>
        A este borrower le gustaría pagar{" "}
        <Text
          variant="body"
          color="textPrimary"
          style={{ fontFamily: "PlusJakartaSans-Bold" }}
        >
          {formatCurrency(paymentAmount)}{" "}
        </Text>
        {paybackFrequency}. El préstamo será pagado en{" "}
        <Text
          variant="body"
          color="textPrimary"
          style={{ fontFamily: "PlusJakartaSans-Bold" }}
        >
          {String(weeksToPayOff)} semanas
        </Text>
        .
      </Text>

      {/* Question */}
      <Text
        variant="body"
        color="textPrimary"
        style={{ fontFamily: "PlusJakartaSans-SemiBold" }}
      >
        ¿Cuál es tu oferta?
      </Text>

      {/* Select */}
      <Select
        label="Número de pagos"
        options={numberOfPaymentsOptions}
        value={selectedPayments}
        onSelect={setSelectedPayments}
        placeholder="Selecciona un número de pagos..."
      />

      {/* Stats cards */}
      {selectedPayments && (
        <Box flexDirection="row" gap="m">
          <Box
            flex={1}
            backgroundColor="secondary"
            borderRadius={12}
            padding="m"
            gap="xs"
          >
            <Text
              variant="subheader"
              style={{ fontFamily: "PlusJakartaSans-Bold", fontSize: 18 }}
              color="darkNavyBlue"
            >
              {formatCurrency(perPaymentAmount)}
            </Text>
            <Text variant="caption" color="textSecondary">
              {paybackFrequency}
            </Text>
          </Box>

          <Box
            flex={1}
            backgroundColor="primary"
            borderRadius={12}
            padding="m"
            gap="xs"
          >
            <Text
              variant="subheader"
              style={{ fontFamily: "PlusJakartaSans-Bold", fontSize: 18 }}
              color="darkNavyBlue"
            >
              {formatCurrency(profit)}
            </Text>
            <Text variant="caption" color="darkNavyBlue">
              Tu ganancia
            </Text>
          </Box>
        </Box>
      )}
    </Box>
  );
}
