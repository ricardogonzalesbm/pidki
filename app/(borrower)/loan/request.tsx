import LoanAmount from "@/components/author/LoanRequest/LoanAmount/LoanAmount";
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
    title: "LoanAmount",
  },
  "2": {
    label: "Paso 2",
    title: "LoanPayback",
  },
  "3": {
    label: "Paso 3",
    title: "Reason",
  },
  "4": {
    label: "Paso 4",
    title: "ReviewConfirm",
  },
};

const stepperItems: CardStepperItemConfig[] = [
  {
    step: { number: 1, label: cardStepper["1"].label },
    title: cardStepper["1"].title,
    isSubmittable: true,
    ChildComponent: LoanAmount,
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
