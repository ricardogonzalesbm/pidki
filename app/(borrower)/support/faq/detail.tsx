import Box from '@/components/Box';
import Text from '@/components/Text';
import { ScrollView } from 'react-native';

export default function FaqDetailScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Box flex={1} padding="l" backgroundColor="mainBackground">
        <Text variant="header" marginTop="xl">
          FAQ Detail
        </Text>
        <Text variant="body" marginTop="m">
          Detailed answer to your question
        </Text>
      </Box>
    </ScrollView>
  );
}
