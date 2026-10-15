import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
  DMSans_600SemiBold
} from '@expo-google-fonts/dm-sans';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'DM-Sans-Regular': DMSans_400Regular,
    'DM-Sans-Medium': DMSans_500Medium,
    'DM-Sans-Bold': DMSans_700Bold,
    'DMSans-SemiBold': DMSans_600SemiBold,
  });

  if (!fontsLoaded) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}