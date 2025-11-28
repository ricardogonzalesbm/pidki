import Box from '@/components/Box';
import Text from '@/components/Text';
import { ScrollView } from 'react-native';

export default function ChangePasswordScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Box flex={1} padding="l" backgroundColor="mainBackground">
        <Text variant="header" marginTop="xl">
          Change Password
        </Text>
        <Text variant="body" marginTop="m">
          Update your password
        </Text>
      </Box>
    </ScrollView>
  );
}
