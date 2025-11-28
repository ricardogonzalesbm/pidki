import Box from '@/components/Box';
import Text from '@/components/Text';
import { ScrollView } from 'react-native';

export default function ManageSubscriptionScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Box flex={1} padding="l" backgroundColor="mainBackground">
        <Text variant="header" marginTop="xl">
          Manage Subscription
        </Text>
        <Text variant="body" marginTop="m">
          View and manage your subscription
        </Text>
      </Box>
    </ScrollView>
  );
}
