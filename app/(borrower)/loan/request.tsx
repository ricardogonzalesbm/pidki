import LoanAmount from "@/components/author/LoanRequest/LoanAmount/LoanAmount";
import LoanPayback from "@/components/author/LoanRequest/LoanPayback/LoanPayback";
import Reason from "@/components/author/LoanRequest/Reason/Reason";
import ReviewConfirm from "@/components/author/LoanRequest/ReviewConfirm/ReviewConfirm";
import Box from "@/components/Box";
import {
  CardsStepper,
  CardStepperItemConfig,
} from "@/components/ui/CardsStepper/CardsStepper";
import HeaderNav from "@/components/ui/HeaderNav/HeaderNav";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native";

const cardStepper = {
  "1": {
    label: "Paso 1",
    title: "Monto",
  },
  "2": {
    label: "Paso 2",
    title: "Devolución",
  },
  "3": {
    label: "Paso 3",
    title: "Motivo",
  },
  "4": {
    label: "Paso 4",
    title: "Confirmación",
  },
};

const stepperItems: CardStepperItemConfig[] = [
  {
    step: { number: 1, label: cardStepper["1"].label },
    title: cardStepper["1"].title,
    isSubmittable: true,
    ChildComponent: LoanAmount,
  },
  {
    step: { number: 2, label: cardStepper["2"].label },
    title: cardStepper["2"].title,
    isSubmittable: true,
    ChildComponent: LoanPayback,
  },
  {
    step: { number: 3, label: cardStepper["3"].label },
    title: cardStepper["3"].title,
    isSubmittable: true,
    ChildComponent: Reason,
  },
  {
    step: { number: 4, label: cardStepper["4"].label },
    title: cardStepper["4"].title,
    isSubmittable: false,
    ChildComponent: ReviewConfirm,
  },
];

export default function RequestLoanScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <HeaderNav title="Crea un Loan" variant="black" isBackButtonEnforced />

      <Box flex={1} padding="l" gap="l" backgroundColor="mainBackground">
        <CardsStepper items={stepperItems} />
      </Box>
    </ScrollView>
  );
}
