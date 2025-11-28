import Box from '@/components/Box';
import Text from '@/components/Text';
import { ScrollView } from 'react-native';

export default function OtpVerificationScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Box flex={1} padding="l" backgroundColor="mainBackground">
        <Text variant="header" marginTop="xl">
          OTP Verification
        </Text>
        <Text variant="body" marginTop="m">
          Verify your phone number with OTP
        </Text>
      </Box>
    </ScrollView>
  );
}
