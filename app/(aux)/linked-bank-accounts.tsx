import Box from '@/components/Box';
import Text from '@/components/Text';
import { ScrollView } from 'react-native';

export default function LinkedBankAccountsScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Box flex={1} padding="l" backgroundColor="mainBackground">
        <Text variant="header" marginTop="xl">
          Linked Bank Accounts
        </Text>
        <Text variant="body" marginTop="m">
          Manage your connected bank accounts
        </Text>
      </Box>
    </ScrollView>
  );
}
