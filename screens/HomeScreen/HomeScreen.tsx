import { useState } from "react";
import { View, StyleSheet } from "react-native";
import notesService from "@/services/note/notes.service";
import useFetch from "@/hooks/useFetch";
import { FullScreenLoader } from "@/components/Common/Loader/FullScreenLoader/FullScreenLoader";
import { NoteActions } from "@/components/NoteList/NoteActions/NoteActions";
import { NoteFormModal } from "@/components/NoteFormModal/NoteFormModal";
import { EmptyState } from "@/components/Common/EmptyState/EmptyState";
import { Note } from "@/models/note.model";
import { NoteList } from "@/components/NoteList/NoteList";
import useConfirmDelete from "@/hooks/useConfirmDelete";
import { useNote } from "@/hooks/useNote";
import { AddNoteButton } from "@/components/AddNoteButton/AddNoteButton";

const HomeScreen = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const { deleteNote } = useNote();

  const errorText = "Something went wrong 😢";

  const {
    data: notes,
    error,
    isLoading,
    setData: setNotes,
  } = useFetch(notesService.fetchNotes, []);
  const confirmDelete = useConfirmDelete();

  const handleDeleteNote = () => {
    if (!selectedNote?.id) return;
    deleteNote({
      noteId: selectedNote?.id,
      onSuccess: () => {
        setNotes((notes ?? []).filter((note) => note.id !== selectedNote.id));
      },
    });
  };

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (error) {
    return <EmptyState title={errorText} />;
  }

  return (
    <>
      <View style={styles.container}>
        <NoteList
          notes={notes ?? []}
          onLongPressNote={(note) => {
            setSelectedNote(note);
            setIsBottomSheetOpen(true);
          }}
        />
        <AddNoteButton onAddButtonPress={() => setIsAddModalOpen(true)} />
      </View>

      <NoteFormModal
        visible={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add a new note"
        callback={(note) => {
          setNotes([note, ...(notes ?? [])]);
        }}
      />

      <NoteActions
        isOpen={isBottomSheetOpen}
        setIsOpen={setIsBottomSheetOpen}
        onDelete={() => {
          setIsBottomSheetOpen(false);
          confirmDelete(handleDeleteNote);
        }}
      />
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 0,
  },
});
