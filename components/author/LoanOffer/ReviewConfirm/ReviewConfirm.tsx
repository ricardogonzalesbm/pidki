import Box from "@/components/Box";
import Text from "@/components/Text";
import Button from "@/components/ui/Button/Button";
import { useCardsStepper } from "@/components/ui/CardsStepper/CardsStepperContext";
import { LoanGuaranteeFee } from "@/utils/constants";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

const formatCurrency = (val: number) =>
  `$${val.toLocaleString("es-MX", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const formatPercent = (val: number) => `${val}%`;

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      paddingVertical="s"
    >
      <Text variant="body" color="textSecondary">
        {label}
      </Text>
      <Text
        variant="body"
        color="textPrimary"
        style={{ fontFamily: "PlusJakartaSans-SemiBold" }}
      >
        {value}
      </Text>
    </Box>
  );
}

export const ReviewConfirm = () => {
  const { payload, submitActiveStep, goToPreviousStep } = useCardsStepper();
  const [termsAccepted, setTermsAccepted] = useState(false);

  const requestCard = payload.loanOfferRequestCard as
    | {
        amountRequested?: number;
        weeksToPayOff?: number;
        paybackFrequencyAmount?: string;
      }
    | undefined;

  const interestRate = Number(payload.loanOfferInterestRate ?? 0);
  const totalInterestRate = interestRate + LoanGuaranteeFee;
  const totalAmount = Number(payload.loanOfferTotalAmount ?? 0);
  const profit = Number(payload.loanOfferProfit ?? 0);
  const actualAmount = Number(requestCard?.amountRequested ?? 0);
  const numberOfPayments = Number(payload.loanRequestNumberOfPayments ?? 0);
  const paybackOfferAmount = Number(payload.loanOfferPaybackOfferAmount ?? 0);
  const weeksToPayOff = requestCard?.weeksToPayOff ?? 0;
  const paybackFrequency =
    requestCard?.paybackFrequencyAmount === "BI_WEEKLY"
      ? "cada dos semanas"
      : "semanalmente";

  const loanTermLabel =
    numberOfPayments > 0
      ? `${formatCurrency(paybackOfferAmount)} ${paybackFrequency} — ${String(weeksToPayOff)} semanas`
      : "—";

  const isSubmitDisabled =
    !termsAccepted || !payload.loanOfferRequestCard || totalInterestRate <= 0;

  return (
    <Box gap="m" paddingBottom="m">
      <Box
        backgroundColor="gray100"
        borderRadius={12}
        paddingHorizontal="m"
        paddingVertical="xs"
      >
        <SummaryRow
          label="Solicitud original"
          value={formatCurrency(actualAmount)}
        />

        <SummaryRow
          label="Tasa de retorno"
          value={formatPercent(interestRate)}
        />

        <SummaryRow
          label="Comisión de garantía"
          value={formatPercent(LoanGuaranteeFee)}
        />

        <SummaryRow
          label="Tasa de interés total"
          value={formatPercent(totalInterestRate)}
        />

        <SummaryRow label="Total a pagar" value={formatCurrency(totalAmount)} />

        <SummaryRow label="Plazo del préstamo" value={loanTermLabel} />
      </Box>

      <Box backgroundColor="primary" borderRadius={12} padding="m" gap="xs">
        <Text
          variant="subheader"
          color="darkNavyBlue"
          style={{ fontFamily: "PlusJakartaSans-Bold", fontSize: 22 }}
        >
          {formatCurrency(profit)}
        </Text>
        <Text
          variant="body"
          color="darkNavyBlue"
          style={{ fontFamily: "PlusJakartaSans-SemiBold" }}
        >
          Tu ganancia
        </Text>
        <Text variant="subtitle" color="darkNavyBlue">
          *Incluye deducción del 7% de comisión de seguro del préstamo
        </Text>
      </Box>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setTermsAccepted((prev) => !prev)}
      >
        <Box flexDirection="row" alignItems="flex-start" gap="m">
          <Box
            width={22}
            height={22}
            borderRadius={6}
            borderWidth={2}
            borderColor={termsAccepted ? "primary" : "gray400"}
            backgroundColor={termsAccepted ? "primary" : "white"}
            alignItems="center"
            justifyContent="center"
            style={{ marginTop: 2 }}
          >
            {termsAccepted && (
              <Text
                variant="subtitle"
                style={{ fontFamily: "PlusJakartaSans-Bold", color: "#000" }}
              >
                ✓
              </Text>
            )}
          </Box>
          <Box flex={1}>
            <Text variant="body" color="textSecondary">
              Acepto hacer el préstamo anterior si soy seleccionado bajo los{" "}
              <Text
                variant="body"
                color="primary"
                style={{ fontFamily: "PlusJakartaSans-SemiBold" }}
              >
                Términos y Condiciones
              </Text>
              .
            </Text>
          </Box>
        </Box>
      </TouchableOpacity>

      <Box flexDirection="row" gap="s" marginTop="s">
        <Box flex={1}>
          <Button variant="outlineGray" fullWidth onPress={goToPreviousStep}>
            ATRÁS
          </Button>
        </Box>
        <Box flex={1}>
          <Button
            variant="primary"
            fullWidth
            disabled={isSubmitDisabled}
            onPress={() => submitActiveStep()}
          >
            ENVIAR
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
