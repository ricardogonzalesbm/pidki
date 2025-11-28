import Box from '@/components/Box';
import Text from '@/components/Text';
import { ScrollView } from 'react-native';

export default function SignUpScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Box flex={1} padding="l" backgroundColor="mainBackground">
        <Text variant="header" marginTop="xl">
          Sign Up
        </Text>
        <Text variant="body" marginTop="m">
          Welcome! Create your Pidki account
        </Text>
      </Box>
    </ScrollView>
  );
}
