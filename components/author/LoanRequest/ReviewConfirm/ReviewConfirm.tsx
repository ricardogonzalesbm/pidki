import Box from "@/components/Box";
import Text from "@/components/Text";
import Button from "@/components/ui/Button/Button";
import { useCardsStepper } from "@/components/ui/CardsStepper/CardsStepperContext";
import theme from "@/theme";
import { DefaultMinLoanAmount } from "@/utils/constants";
import { useRouter } from "expo-router";
import { PiggyBank } from "lucide-react-native";

type PaybackFrequency = "WEEKLY" | "BI_WEEKLY" | "MONTHLY";

const frequencyLabel: Record<PaybackFrequency, string> = {
  WEEKLY: "Semanal",
  BI_WEEKLY: "Quincenal",
  MONTHLY: "Mensual",
};

const reasonLabel: Record<string, string> = {
  homeRepair: "Reparación del hogar",
  carRepair: "Reparación de auto",
  medical: "Médico",
  groceries: "Compras",
  bills: "Facturas",
  emergency: "Emergencia",
  moving: "Mudanza",
  education: "Educación",
  other: "Otro",
};

const formatCurrency = (val: number) =>
  `S/ ${val.toLocaleString("es-PE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

interface RowProps {
  label: string;
  value: string;
}

const Row = ({ label, value }: RowProps) => (
  <Box
    flexDirection="row"
    justifyContent="space-between"
    alignItems="center"
    paddingVertical="s"
    borderBottomWidth={1}
    borderColor="gray200"
  >
    <Text variant="body" color="textSecondary">
      {label}
    </Text>
    <Text variant="bodyBold" color="textPrimary">
      {value}
    </Text>
  </Box>
);

const ReviewConfirm = () => {
  const { payload } = useCardsStepper();
  const router = useRouter();

  const loanAmount = (payload.loanAmount as number) ?? DefaultMinLoanAmount;
  const frequency = payload.paybackFrequency as PaybackFrequency | undefined;
  const numberOfPayments = payload.numberOfPayments as number | undefined;
  const reason = payload.reason as string | undefined;

  const handleConfirm = () => {
    router.push("/(borrower)/(tabs)/loan");
  };

  return (
    <Box gap="m" paddingBottom="m">
      <Box alignItems="center">
        <PiggyBank size={120} color={theme.colors.primary} strokeWidth={1.5} />
      </Box>

      <Box gap="xs">
        <Row
          label="Monto del préstamo:"
          value={`${formatCurrency(loanAmount)}*`}
        />
        <Row
          label="Frecuencia de pago:"
          value={frequency ? frequencyLabel[frequency] : "—"}
        />
        <Row
          label="Número de pagos:"
          value={numberOfPayments != null ? String(numberOfPayments) : "—"}
        />
        <Row
          label="Motivo:"
          value={reason ? (reasonLabel[reason] ?? reason) : "—"}
        />
      </Box>

      <Text
        variant="caption"
        color="textSecondary"
        style={{ textAlign: "center" }}
      >
        *Monto total basado en la oferta seleccionada
      </Text>

      <Button variant="primary" fullWidth onPress={handleConfirm}>
        Confirmar solicitud
      </Button>
    </Box>
  );
};

export default ReviewConfirm;
