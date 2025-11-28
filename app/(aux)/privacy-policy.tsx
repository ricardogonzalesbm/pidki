import Box from '@/components/Box';
import Text from '@/components/Text';
import { ScrollView } from 'react-native';

export default function PrivacyPolicyScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Box flex={1} padding="l" backgroundColor="mainBackground">
        <Text variant="header" marginTop="xl">
          Privacy Policy
        </Text>
        <Text variant="body" marginTop="m">
          Read our privacy policy
        </Text>
      </Box>
    </ScrollView>
  );
}
