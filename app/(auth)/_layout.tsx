import { Stack } from 'expo-router';
import theme from '@/theme';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-up/index" options={{ contentStyle: { backgroundColor: theme.colors.black } }} />
      <Stack.Screen name="sign-in/index" options={{ contentStyle: { backgroundColor: theme.colors.black } }} />
      <Stack.Screen name="verify-code" />
    </Stack>
  );
}
