import Box from '@/components/Box';
import Text from '@/components/Text';
import { ScrollView } from 'react-native';

export default function SocialSecurityNumberScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Box flex={1} padding="l" backgroundColor="mainBackground">
        <Text variant="header" marginTop="xl">
          Social Security Number
        </Text>
        <Text variant="body" marginTop="m">
          Enter your SSN for verification
        </Text>
      </Box>
    </ScrollView>
  );
}
