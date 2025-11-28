import Box from '@/components/Box';
import Text from '@/components/Text';
import { ScrollView } from 'react-native';

export default function EditProfileScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Box flex={1} padding="l" backgroundColor="mainBackground">
        <Text variant="header" marginTop="xl">
          Edit Profile
        </Text>
        <Text variant="body" marginTop="m">
          Update your profile information
        </Text>
      </Box>
    </ScrollView>
  );
}
