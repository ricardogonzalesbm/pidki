import Box from '@/components/Box';
import Text from '@/components/Text';
import { ScrollView } from 'react-native';

export default function VerifyCodeScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Box flex={1} padding="l" backgroundColor="mainBackground">
        <Text variant="header" marginTop="xl">
          Enter Verification Code
        </Text>
        <Text variant="body" marginTop="m">
          Enter the code we sent to your phone
        </Text>
      </Box>
    </ScrollView>
  );
}
