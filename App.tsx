import { StatusBar } from "expo-status-bar";
import { Platform, View, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Providers } from "./context/Providers/Providers";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import colors from "./utils/constants/colors";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const APPBAR_HEIGHT = isLoadingComplete && Platform.OS === "ios" ? 60 : 0;

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Providers>
          <SafeAreaView style={{ flex: 1 }}>
            <Navigation colorScheme={colorScheme} />
            <StatusBar backgroundColor={colors.primary} />
            <View style={[styles.appBar, { height: APPBAR_HEIGHT }]} />
          </SafeAreaView>
        </Providers>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appBar: {
    backgroundColor: colors.primary,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    zIndex: -1,
  },
});
