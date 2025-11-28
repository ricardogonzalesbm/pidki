import Box from '@/components/Box';
import Text from '@/components/Text';
import { ScrollView } from 'react-native';

export default function BorrowerLoanTabScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Box flex={1} padding="l" backgroundColor="mainBackground">
        <Text variant="header" marginTop="xl">
          My Loans
        </Text>
        <Text variant="body" marginTop="m">
          View and manage your loan requests
        </Text>
      </Box>
    </ScrollView>
  );
}
