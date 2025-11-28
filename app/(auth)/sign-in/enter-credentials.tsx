import Box from '@/components/Box';
import Text from '@/components/Text';
import { ScrollView } from 'react-native';

export default function EnterCredentialsScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Box flex={1} padding="l" backgroundColor="mainBackground">
        <Text variant="header" marginTop="xl">
          Enter Credentials
        </Text>
        <Text variant="body" marginTop="m">
          Enter your username and password
        </Text>
      </Box>
    </ScrollView>
  );
}
