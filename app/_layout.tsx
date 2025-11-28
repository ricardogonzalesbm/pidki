import { ThemeProvider } from '@shopify/restyle';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import theme from '@/theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Quicksand-Regular': require('../assets/fonts/Quicksand/Quicksand-Regular.ttf'),
    'Quicksand-Light': require('../assets/fonts/Quicksand/Quicksand-Light.ttf'),
    'Quicksand-Medium': require('../assets/fonts/Quicksand/Quicksand-Medium.ttf'),
    'Quicksand-SemiBold': require('../assets/fonts/Quicksand/Quicksand-SemiBold.ttf'),
    'Quicksand-Bold': require('../assets/fonts/Quicksand/Quicksand-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(borrower)" />
        <Stack.Screen name="(lender)" />
        <Stack.Screen name="profile-settings" />
        <Stack.Screen name="(aux)" />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
