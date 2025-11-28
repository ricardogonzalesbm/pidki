import Box from '@/components/Box';
import Text from '@/components/Text';
import { ScrollView } from 'react-native';

export default function EnterPhoneNumberScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Box flex={1} padding="l" backgroundColor="mainBackground">
        <Text variant="header" marginTop="xl">
          Enter Phone Number
        </Text>
        <Text variant="body" marginTop="m">
          We'll send you a verification code
        </Text>
      </Box>
    </ScrollView>
  );
}
