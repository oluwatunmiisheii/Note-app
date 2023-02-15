import { View, Text, StyleSheet } from "react-native";
import colors from "@/utils/constants/colors";

export const InputError = ({ error }: { error: string }) => {
  return (
    <View>
      <Text style={styles.error}>{error}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  error: {
    color: colors.danger,
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 5,
    marginTop: 2,
  },
});
