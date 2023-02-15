import { Feather } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import useConfirmDelete from "../../../../../hooks/useConfirmDelete";

interface HeaderRightProps {
  onDelete: () => void;
  onEdit: () => void;
}

export const HeaderRight = ({ onDelete, onEdit }: HeaderRightProps) => {
  const confirmDelete = useConfirmDelete();

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Pressable
        style={{ marginRight: 20 }}
        onPress={onEdit}
        accessibilityLabel="edit note"
      >
        <Feather name="edit" color="white" size={20} />
      </Pressable>
      <Pressable
        onPress={() => {
          confirmDelete(onDelete);
        }}
        accessibilityLabel="delete note"
      >
        <Feather name="trash-2" color="white" size={20} />
      </Pressable>
    </View>
  );
};
