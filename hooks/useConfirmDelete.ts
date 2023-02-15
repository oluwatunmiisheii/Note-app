import { Alert } from "react-native";

export const defaultConfirmDeleteText =
  "Are you sure you want to delete this note?";

export default function useConfirmDelete() {
  const confirmDelete = (
    onConfirm: () => void,
    text = defaultConfirmDeleteText
  ) => {
    Alert.alert(
      "Delete",
      text,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Delete", onPress: onConfirm },
      ],
      { cancelable: false }
    );
  };

  return confirmDelete;
}
