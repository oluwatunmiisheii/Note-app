import { View, StyleSheet, ActivityIndicator } from "react-native";
import colors from "@/utils/constants/colors";

export const FullScreenLoader = () => (
  <View style={styles.container} testID="fullscreen-loader">
    <ActivityIndicator size="large" color={colors.primary} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
