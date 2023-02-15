import { FontAwesome } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import { Button } from "../Common/Button/Button";

interface AddNoteButtonProps {
  onAddButtonPress: () => void;
}

export const AddNoteButton = ({ onAddButtonPress }: AddNoteButtonProps) => {
  return (
    <View style={styles.container}>
      <Button
        onPress={onAddButtonPress}
        customStyles={styles.addButton}
        circle
        testID="add-note-button"
      >
        <FontAwesome name="plus" size={30} color="white" />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  addButton: {
    position: "absolute",
    right: 10,
    bottom: 0,
  },
});
