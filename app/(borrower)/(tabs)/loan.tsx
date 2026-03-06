import Box from "@/components/Box";
import Text from "@/components/Text";
import Button from "@/components/ui/Button/Button";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native";

export default function BorrowerLoanTabScreen() {
  const router = useRouter();

  return (
    <ScrollView style={{ flex: 1 }}>
      <Box flex={1} padding="l" backgroundColor="mainBackground">
        <Text variant="header" marginTop="xl">
          My Loans
        </Text>
        <Text variant="body" marginTop="m">
          View and manage your loan requests
        </Text>
        <Box marginTop="l">
          <Button
            icon="Plus"
            onPress={() =>
              router.push({
                pathname: "/(borrower)/loan/request",
              })
            }
            fullWidth
          >
            Create Loan Request
          </Button>
        </Box>
      </Box>
    </ScrollView>
  );
}
