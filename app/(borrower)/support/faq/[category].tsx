import Box from '@/components/Box';
import Text from '@/components/Text';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native';

export default function FaqCategoryScreen() {
  const { category } = useLocalSearchParams();

  return (
    <ScrollView style={{ flex: 1 }}>
      <Box flex={1} padding="l" backgroundColor="mainBackground">
        <Text variant="header" marginTop="xl">
          FAQ Category
        </Text>
        <Text variant="body" marginTop="m">
          Category: {category}
        </Text>
      </Box>
    </ScrollView>
  );
}
