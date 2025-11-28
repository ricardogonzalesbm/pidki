import Box from '@/components/Box';
import Text from '@/components/Text';
import { ScrollView } from 'react-native';

export default function LoanOfferScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Box flex={1} padding="l" backgroundColor="mainBackground">
        <Text variant="header" marginTop="xl">
          Make Loan Offer
        </Text>
        <Text variant="body" marginTop="m">
          Create an offer for this loan request
        </Text>
      </Box>
    </ScrollView>
  );
}
