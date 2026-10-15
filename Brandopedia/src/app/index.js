import { StatusBar } from 'expo-status-bar';
import TabNavigator from '../screens/navigator/tab';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F0F0E8" }}>
          <StatusBar backgroundColor="#fff" barStyle="dark-content" />
          <TabNavigator />
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}