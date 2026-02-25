import Box from "@/components/Box";
import Text from "@/components/Text";
import { ScrollView } from "react-native";

export default function BorrowerHomeScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Box flex={1} padding="l" backgroundColor="secondary">
        <Text variant="header" marginTop="xl">
          Borrower Home
        </Text>
        <Text variant="body" marginTop="m">
          Welcome to your dashboard
        </Text>
      </Box>
    </ScrollView>
  );
}
