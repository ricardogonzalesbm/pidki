import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-up/index" />
      <Stack.Screen name="sign-in/index" />
      <Stack.Screen name="verify-code" />
    </Stack>
  );
}
