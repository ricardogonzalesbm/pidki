import Box from "@/components/Box";
import Text from "@/components/Text";
import CardsStepper, {
  CardStepperItemConfig,
} from "@/components/ui/CardsStepper/CardsStepper";
import ContentX from "@/components/ui/CardsStepper/ContentX";
import ContentY from "@/components/ui/CardsStepper/ContentY";
import ContentZ from "@/components/ui/CardsStepper/ContentZ";
import { mockCardStepperData } from "@/components/ui/CardsStepper/mockCardStepperData";
import ScreenHeader from "@/components/ui/ScreenHeader/ScreenHeader";
import { mockLoanRequests } from "@/data/mockLoanRequests";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native";

const cardStepper = mockCardStepperData;

const stepperItems: CardStepperItemConfig[] = [
  {
    step: { number: 1, label: cardStepper["1"].label },
    title: cardStepper["1"].title,
    isSubmittable: true,
    ChildComponent: ContentX,
  },
  {
    step: { number: 2, label: cardStepper["2"].label },
    title: cardStepper["2"].title,
    isSubmittable: true,
    ChildComponent: ContentY,
  },
  {
    step: { number: 3, label: cardStepper["3"].label },
    title: cardStepper["3"].title,
    isSubmittable: true,
    ChildComponent: ContentZ,
  },
];

export default function LoanOfferScreen() {
  const router = useRouter();
  const { loanRequestId } = useLocalSearchParams();

  const loanRequest = mockLoanRequests.find(
    (request) => request.id === loanRequestId,
  );

  if (!loanRequest) {
    return (
      <ScrollView style={{ flex: 1 }}>
        <ScreenHeader title="Error" onBack={() => router.back()} />
        <Box flex={1} padding="l" backgroundColor="mainBackground">
          <Text variant="body" marginTop="m">
            Solicitud de préstamo no encontrada
          </Text>
        </Box>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <ScreenHeader
        title="Hacer Oferta"
        subtitle="Crea una oferta para esta solicitud de préstamo"
        onBack={() => router.back()}
        variant="black"
      />

      <Box flex={1} padding="l" gap="l" backgroundColor="mainBackground">
        {/* Offer Stepper */}
        <CardsStepper items={stepperItems} />
      </Box>
    </ScrollView>
  );
}
