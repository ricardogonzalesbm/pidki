import Box from '@/components/Box';
import Text from '@/components/Text';
import { ScrollView } from 'react-native';

export default function LoanBalanceScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Box flex={1} padding="l" backgroundColor="mainBackground">
        <Text variant="header" marginTop="xl">
          Loan Balance
        </Text>
        <Text variant="body" marginTop="m">
          View your current loan balance
        </Text>
      </Box>
    </ScrollView>
  );
}
