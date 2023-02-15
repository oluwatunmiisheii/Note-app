import { Note } from "@/models/note.model";
import { FlatList } from "react-native";
import { EmptyState } from "../Common/EmptyState/EmptyState";
import { NoteItem } from "./NoteItem/NoteItem";

type NoteListProps = Omit<React.ComponentProps<typeof NoteItem>, "note"> & {
  notes: Note[];
};

export const NoteList = (props: NoteListProps) => {
  const { notes, onLongPressNote } = props;
  return (
    <FlatList
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      data={notes}
      ListEmptyComponent={
        <EmptyState
          title="No notes found!"
          description="You can add a new note by clicking the + button"
        />
      }
      renderItem={({ item }) => (
        <NoteItem note={item} onLongPressNote={onLongPressNote} />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};
