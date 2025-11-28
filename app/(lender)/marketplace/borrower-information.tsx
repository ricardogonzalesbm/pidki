import Box from '@/components/Box';
import Text from '@/components/Text';
import { ScrollView } from 'react-native';

export default function BorrowerInformationScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Box flex={1} padding="l" backgroundColor="mainBackground">
        <Text variant="header" marginTop="xl">
          Borrower Information
        </Text>
        <Text variant="body" marginTop="m">
          View borrower profile and score
        </Text>
      </Box>
    </ScrollView>
  );
}
