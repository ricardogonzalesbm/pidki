import Box from '@/components/Box';
import Text from '@/components/Text';
import { ScrollView } from 'react-native';

export default function ProfileSettingsScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Box flex={1} padding="l" backgroundColor="mainBackground">
        <Text variant="header" marginTop="xl">
          Profile Settings
        </Text>
        <Text variant="body" marginTop="m">
          Manage your account settings
        </Text>
      </Box>
    </ScrollView>
  );
}
