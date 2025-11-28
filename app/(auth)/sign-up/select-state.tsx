import Box from '@/components/Box';
import Text from '@/components/Text';
import { ScrollView } from 'react-native';

export default function SelectStateScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Box flex={1} padding="l" backgroundColor="mainBackground">
        <Text variant="header" marginTop="xl">
          Select State
        </Text>
        <Text variant="body" marginTop="m">
          Choose your state
        </Text>
      </Box>
    </ScrollView>
  );
}
