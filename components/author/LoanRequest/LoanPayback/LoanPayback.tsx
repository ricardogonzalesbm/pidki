import Box from "@/components/Box";
import Text from "@/components/Text";
import Select, { SelectOption } from "@/components/ui/Select/Select";
import { useCardsStepper } from "@/components/ui/CardsStepper/CardsStepperContext";
import { useEffect, useState } from "react";

type PaybackFrequency = "WEEKLY" | "BI_WEEKLY" | "MONTHLY";

const frequencyOptions: SelectOption[] = [
  { label: "Semanal", value: "WEEKLY" },
  { label: "Quincenal", value: "BI_WEEKLY" },
  { label: "Mensual", value: "MONTHLY" },
];

const paymentCountOptions: Record<PaybackFrequency, SelectOption[]> = {
  WEEKLY: [
    { label: "26 pagos semanales", value: "26" },
    { label: "52 pagos semanales", value: "52" },
    { label: "78 pagos semanales", value: "78" },
    { label: "104 pagos semanales", value: "104" },
  ],
  BI_WEEKLY: [
    { label: "26 pagos quincenales", value: "26" },
    { label: "52 pagos quincenales", value: "52" },
    { label: "78 pagos quincenales", value: "78" },
    { label: "104 pagos quincenales", value: "104" },
  ],
  MONTHLY: [
    { label: "12 pagos mensuales", value: "12" },
    { label: "24 pagos mensuales", value: "24" },
    { label: "36 pagos mensuales", value: "36" },
    { label: "48 pagos mensuales", value: "48" },
  ],
};

const frequencyLabel: Record<PaybackFrequency, string> = {
  WEEKLY: "semana",
  BI_WEEKLY: "quincena",
  MONTHLY: "mes",
};

const getEndDate = (frequency: PaybackFrequency, numberOfPayments: number): string => {
  const now = new Date();
  const end = new Date(now);

  if (frequency === "WEEKLY") end.setDate(now.getDate() + numberOfPayments * 7);
  else if (frequency === "BI_WEEKLY") end.setDate(now.getDate() + numberOfPayments * 14);
  else end.setMonth(now.getMonth() + numberOfPayments);

  return end.toLocaleDateString("es-PE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const LoanPayback = () => {
  const { updatePayload } = useCardsStepper();
  const [frequency, setFrequency] = useState<PaybackFrequency | "">("");
  const [numberOfPayments, setNumberOfPayments] = useState("");

  useEffect(() => {
    if (frequency !== "" && numberOfPayments !== "") {
      updatePayload({ paybackFrequency: frequency, numberOfPayments: Number(numberOfPayments) });
    }
  }, [frequency, numberOfPayments]);

  const handleFrequencyChange = (value: string) => {
    setFrequency(value as PaybackFrequency);
    setNumberOfPayments("");
  };

  const showSimulation = frequency !== "" && numberOfPayments !== "";
  const endDate = showSimulation
    ? getEndDate(frequency as PaybackFrequency, Number(numberOfPayments))
    : "";

  return (
    <Box gap="m" paddingBottom="m">
      <Text
        variant="body"
        color="textSecondary"
        style={{ lineHeight: 24, textAlign: "center" }}
      >
        ¿Cada cuánto quieres pagar?
      </Text>

      <Select
        label="Frecuencia de pago"
        options={frequencyOptions}
        value={frequency}
        onSelect={handleFrequencyChange}
        placeholder="Selecciona..."
      />

      {frequency !== "" && (
        <Select
          label="Número de pagos"
          options={paymentCountOptions[frequency as PaybackFrequency]}
          value={numberOfPayments}
          onSelect={setNumberOfPayments}
          placeholder="Selecciona..."
        />
      )}

      {showSimulation && (
        <Box backgroundColor="gray100" padding="m" borderRadius={6} gap="xs">
          <Text
            variant="body"
            color="textSecondary"
            style={{ lineHeight: 24, textAlign: "center" }}
          >
            Pagarás aproximadamente{" "}
            <Text
              variant="body"
              color="textPrimary"
              style={{ fontFamily: "PlusJakartaSans-Bold" }}
            >
              $X – $Y*{" "}
            </Text>
            cada {frequencyLabel[frequency as PaybackFrequency]} hasta el{" "}
            <Text
              variant="body"
              color="textPrimary"
              style={{ fontFamily: "PlusJakartaSans-Bold" }}
            >
              {endDate}
            </Text>
            .
          </Text>
          <Text
            variant="caption"
            color="textSecondary"
            style={{ textAlign: "center" }}
          >
            *Monto total basado en la oferta seleccionada
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default LoanPayback;
