import Box from '@/components/Box';
import Text from '@/components/Text';
import { ScrollView } from 'react-native';

export default function LenderSupportTabScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Box flex={1} padding="l" backgroundColor="mainBackground">
        <Text variant="header" marginTop="xl">
          Support
        </Text>
        <Text variant="body" marginTop="m">
          Get help and find answers
        </Text>
      </Box>
    </ScrollView>
  );
}
