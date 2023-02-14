import { Alert } from "react-native";

const defaultText = "Are you sure you want to delete this note?";

export default function useConfirmDelete() {
  const confirmDelete = (onConfirm: () => void, text = defaultText) => {
    Alert.alert(
      "Delete",
      text,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: onConfirm },
      ],
      { cancelable: false }
    );
  };

  return confirmDelete;
}
