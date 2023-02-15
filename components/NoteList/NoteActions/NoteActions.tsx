import { View, Text, StyleSheet } from "react-native";
import colors from "@/utils/constants/colors";
import { BottomSheet } from "@/components/Common/BottomSheet/BottomSheet";
import { Button } from "@/components/Common/Button/Button";

interface NoteActionsProps {
  onDelete: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const NoteActions = (props: NoteActionsProps) => {
  const { onDelete, isOpen, setIsOpen } = props;
  return (
    <BottomSheet isOpen={isOpen} setIsOpen={setIsOpen}>
      <View style={styles.deleteActionContainer}>
        <Button variant="plain" onPress={onDelete}>
          <View style={styles.actionContainer}>
            <Text style={styles.actionText}>Delete</Text>
          </View>
        </Button>
      </View>
      <Button variant="plain" onPress={() => setIsOpen(false)}>
        <View style={styles.actionContainer}>
          <Text style={[styles.actionText, styles.cancelActionText]}>
            Cancel
          </Text>
        </View>
      </Button>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteActionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  actionText: {
    color: colors.gray,
    fontSize: 20,
    marginLeft: 10,
    fontWeight: "500",
  },
  cancelActionText: {
    color: colors.primary,
  },
});
