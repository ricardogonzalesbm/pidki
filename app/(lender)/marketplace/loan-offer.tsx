import Box from "@/components/Box";
import Text from "@/components/Text";
import ScreenHeader from "@/components/ui/ScreenHeader/ScreenHeader";
import { mockLoanRequests } from "@/data/mockLoanRequests";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView } from "react-native";

export default function LoanOfferScreen() {
  const router = useRouter();
  const { loanRequestId } = useLocalSearchParams();

  // Find the loan request by ID
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
      <ScreenHeader
        title="Hacer Oferta"
        subtitle="Crea una oferta para esta solicitud de préstamo"
        onBack={() => router.back()}
        variant="white"
      />

      <Box flex={1} padding="l" backgroundColor="mainBackground">
        {/* Loan Request Summary */}
        <Box padding="l" backgroundColor="white" borderRadius={16}>
          <Text
            variant="body"
            marginBottom="m"
            style={{
              fontFamily: "PlusJakartaSans-SemiBold",
              fontSize: 18,
            }}
          >
            Detalles de la Solicitud
          </Text>

          <Box gap="s">
            <Box flexDirection="row" justifyContent="space-between">
              <Text variant="body" color="textSecondary">
                Prestatario:
              </Text>
              <Text
                variant="body"
                style={{ fontFamily: "PlusJakartaSans-SemiBold" }}
              >
                {loanRequest.borrowerName}
              </Text>
            </Box>

            <Box flexDirection="row" justifyContent="space-between">
              <Text variant="body" color="textSecondary">
                Monto Solicitado:
              </Text>
              <Text
                variant="body"
                style={{ fontFamily: "PlusJakartaSans-SemiBold" }}
              >
                S/ {loanRequest.amountRequested.toFixed(2)}
              </Text>
            </Box>

            <Box flexDirection="row" justifyContent="space-between">
              <Text variant="body" color="textSecondary">
                Pidki Score:
              </Text>
              <Text
                variant="body"
                style={{ fontFamily: "PlusJakartaSans-SemiBold" }}
              >
                {loanRequest.userScore} / 100
              </Text>
            </Box>

            <Box flexDirection="row" justifyContent="space-between">
              <Text variant="body" color="textSecondary">
                Cuotas:
              </Text>
              <Text
                variant="body"
                style={{ fontFamily: "PlusJakartaSans-SemiBold" }}
              >
                {loanRequest.numberOfPayments}{" "}
                {loanRequest.numberOfPayments === 1 ? "mes" : "meses"}
              </Text>
            </Box>
          </Box>
        </Box>

        {/* TODO: Add form to create loan offer */}
        <Box marginTop="l">
          <Text variant="body" color="textSecondary">
            [Formulario de oferta de préstamo - próximamente]
          </Text>
        </Box>
      </Box>
    </ScrollView>
  );
}
