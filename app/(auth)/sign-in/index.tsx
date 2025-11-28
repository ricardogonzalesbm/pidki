import Box from '@/components/Box';
import Text from '@/components/Text';
import { ScrollView } from 'react-native';

export default function SignInScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Box flex={1} padding="l" backgroundColor="mainBackground">
        <Text variant="header" marginTop="xl">
          Sign In
        </Text>
        <Text variant="body" marginTop="m">
          Welcome back to Pidki
        </Text>
      </Box>
    </ScrollView>
  );
}
