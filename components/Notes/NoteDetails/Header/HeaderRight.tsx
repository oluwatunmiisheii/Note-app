import { AntDesign, Feather } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import useConfirmDelete from "../../../../hooks/useConfirmDelete";

interface HeaderRightProps {
  onDelete: () => void;
  onEdit: () => void;
}

export const HeaderRight = ({ onDelete, onEdit }: HeaderRightProps) => {
  const confirmDelete = useConfirmDelete();

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Pressable style={{ marginRight: 20 }} onPress={onEdit}>
        <AntDesign name="edit" color="white" size={24} />
      </Pressable>
      <Pressable
        onPress={() => {
          confirmDelete(onDelete);
        }}
      >
        <Feather name="trash-2" color="white" size={24} />
      </Pressable>
    </View>
  );
};
