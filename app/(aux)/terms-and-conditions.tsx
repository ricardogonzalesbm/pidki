import Box from '@/components/Box';
import Text from '@/components/Text';
import { ScrollView } from 'react-native';

export default function TermsAndConditionsScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Box flex={1} padding="l" backgroundColor="mainBackground">
        <Text variant="header" marginTop="xl">
          Terms and Conditions
        </Text>
        <Text variant="body" marginTop="m">
          Read our terms and conditions
        </Text>
      </Box>
    </ScrollView>
  );
}
