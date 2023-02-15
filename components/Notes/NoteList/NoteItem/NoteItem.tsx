import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Note } from "../../../../models/note.model";
import { getFormattedDate } from "../../../../utils/date";
import {
  Gesture,
  GestureDetector,
  gestureHandlerRootHOC,
} from "react-native-gesture-handler";

interface NoteItemProps {
  note: Note;
  showActions: (note: Note) => void;
}

export const NoteItem = gestureHandlerRootHOC(
  ({ note, showActions }: NoteItemProps) => {
    const navigation = useNavigation();

    const goToDetailsScreen = () => {
      navigation.navigate("NoteDetailsScreen", { noteId: note.id });
    };

    const longPressGesture = Gesture.LongPress().onEnd((event, success) => {
      if (success) {
        showActions(note);
      }
    });

    return (
      <GestureDetector gesture={longPressGesture}>
        <Pressable style={styles.noteContainer} onPress={goToDetailsScreen}>
          <View style={styles.noteHeader}>
            <Text
              style={styles.noteTitle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {note.title}
            </Text>
            <Text>{getFormattedDate(new Date(note.date))}</Text>
          </View>
          <Text numberOfLines={2} ellipsizeMode="tail">
            {note.description}
          </Text>
        </Pressable>
      </GestureDetector>
    );
  }
);

const styles = StyleSheet.create({
  noteContainer: {
    width: "100%",
    backgroundColor: "#FDE69A",
    borderColor: "#FDE69A",
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 20,
    padding: 12,
    justifyContent: "space-between",
    elevation: 3,
    shadowColor: "#000",
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
  },
  noteHeader: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "700",
    maxWidth: "76%",
    flex: 1,
    marginBottom: 5,
  },
});
