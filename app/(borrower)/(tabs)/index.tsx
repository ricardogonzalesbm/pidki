import Box from "@/components/Box";
import Text from "@/components/Text";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native";

export default function BorrowerHomeScreen() {
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
      <StatusBar style="dark" />
      <Box flex={1} padding="l" backgroundColor="mainBackground">
        <Box marginTop="xl" marginBottom="l">
          <Text
            variant="header"
            style={{
              fontSize: 28,
              fontFamily: "PlusJakartaSans-Bold",
            }}
          >
            Borrower
          </Text>
          <Text variant="body" marginTop="m">
            Welcome to your dashboard
          </Text>
        </Box>
      </Box>
    </ScrollView>
  );
}
