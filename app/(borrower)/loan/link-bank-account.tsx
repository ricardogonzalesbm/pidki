import Box from '@/components/Box';
import Text from '@/components/Text';
import { ScrollView } from 'react-native';

export default function LinkBankAccountScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Box flex={1} padding="l" backgroundColor="mainBackground">
        <Text variant="header" marginTop="xl">
          Link Bank Account
        </Text>
        <Text variant="body" marginTop="m">
          Connect your bank account
        </Text>
      </Box>
    </ScrollView>
  );
}
