import Box from '@/components/Box';
import Text from '@/components/Text';
import { ScrollView } from 'react-native';

export default function LenderMarketplaceScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Box flex={1} padding="l" backgroundColor="mainBackground">
        <Text variant="header" marginTop="xl">
          Marketplace
        </Text>
        <Text variant="body" marginTop="m">
          Browse loan requests from borrowers
        </Text>
      </Box>
    </ScrollView>
  );
}
