import Box from '@/components/Box';
import Text from '@/components/Text';
import { ScrollView } from 'react-native';

export default function CreateAccountScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Box flex={1} padding="l" backgroundColor="mainBackground">
        <Text variant="header" marginTop="xl">
          Create Account
        </Text>
        <Text variant="body" marginTop="m">
          Complete your profile information
        </Text>
      </Box>
    </ScrollView>
  );
}
