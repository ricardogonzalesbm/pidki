import Box from '@/components/Box';
import Text from '@/components/Text';
import { ScrollView } from 'react-native';

export default function LoanOffersScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Box flex={1} padding="l" backgroundColor="mainBackground">
        <Text variant="header" marginTop="xl">
          Loan Offers
        </Text>
        <Text variant="body" marginTop="m">
          View offers from lenders
        </Text>
      </Box>
    </ScrollView>
  );
}
