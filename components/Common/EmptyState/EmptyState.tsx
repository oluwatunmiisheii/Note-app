import colors from "@/utils/constants/colors";
import { View, Text, StyleSheet } from "react-native";

interface EmptyStateProps {
  title: string;
  description?: string;
}

export const EmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
  },
  description: {
    fontSize: 16,
    color: colors.gray,
    marginTop: 10,
  },
});
