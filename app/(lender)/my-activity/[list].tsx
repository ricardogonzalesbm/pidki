import Box from '@/components/Box';
import Text from '@/components/Text';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native';

export default function ActivityListScreen() {
  const { list } = useLocalSearchParams();

  return (
    <ScrollView style={{ flex: 1 }}>
      <Box flex={1} padding="l" backgroundColor="mainBackground">
        <Text variant="header" marginTop="xl">
          Activity List
        </Text>
        <Text variant="body" marginTop="m">
          List: {list}
        </Text>
      </Box>
    </ScrollView>
  );
}
