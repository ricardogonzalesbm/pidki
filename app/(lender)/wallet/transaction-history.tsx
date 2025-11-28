import Box from '@/components/Box';
import Text from '@/components/Text';
import { ScrollView } from 'react-native';

export default function LenderTransactionHistoryScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Box flex={1} padding="l" backgroundColor="mainBackground">
        <Text variant="header" marginTop="xl">
          Transaction History
        </Text>
        <Text variant="body" marginTop="m">
          View all your transactions
        </Text>
      </Box>
    </ScrollView>
  );
}
