import Box from '@/components/Box';
import Text from '@/components/Text';
import { ScrollView } from 'react-native';

export default function LoanHistoryScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Box flex={1} padding="l" backgroundColor="mainBackground">
        <Text variant="header" marginTop="xl">
          Loan History
        </Text>
        <Text variant="body" marginTop="m">
          View your past loans
        </Text>
      </Box>
    </ScrollView>
  );
}
