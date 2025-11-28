import Box from '@/components/Box';
import Text from '@/components/Text';
import { ScrollView } from 'react-native';

export default function LenderNotificationsScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Box flex={1} padding="l" backgroundColor="mainBackground">
        <Text variant="header" marginTop="xl">
          Notifications
        </Text>
        <Text variant="body" marginTop="m">
          Your recent notifications
        </Text>
      </Box>
    </ScrollView>
  );
}
