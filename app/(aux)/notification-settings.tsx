import Box from '@/components/Box';
import Text from '@/components/Text';
import { ScrollView } from 'react-native';

export default function NotificationSettingsScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Box flex={1} padding="l" backgroundColor="mainBackground">
        <Text variant="header" marginTop="xl">
          Notification Settings
        </Text>
        <Text variant="body" marginTop="m">
          Manage your notification preferences
        </Text>
      </Box>
    </ScrollView>
  );
}
