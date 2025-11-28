import Box from '@/components/Box';
import Text from '@/components/Text';
import { ScrollView } from 'react-native';

export default function CreatePasswordScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Box flex={1} padding="l" backgroundColor="mainBackground">
        <Text variant="header" marginTop="xl">
          Create Password
        </Text>
        <Text variant="body" marginTop="m">
          Choose a secure password
        </Text>
      </Box>
    </ScrollView>
  );
}
