import Box from '@/components/Box';
import Text from '@/components/Text';
import { ScrollView } from 'react-native';

export default function RequestLoanScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Box flex={1} padding="l" backgroundColor="mainBackground">
        <Text variant="header" marginTop="xl">
          Request Loan
        </Text>
        <Text variant="body" marginTop="m">
          Create a new loan request
        </Text>
      </Box>
    </ScrollView>
  );
}
