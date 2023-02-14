import { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Button } from "../components/Button/Button";
import notesService from "../services/notes.service";
import useFetch from "../hooks/useFetch";
import { FullScreenLoader } from "../components/Loader/FullScreenLoader";
import { BottomAction } from "../components/Notes/NoteList/BottomAction";
import { NoteFormModal } from "../components/Notes/NoteFormModal";
import { EmptyState } from "../components/EmptyState/EmptyState";
import { NoteItem } from "../components/Notes/NoteList/NoteItem";
import { Note } from "../models/note.model";
import { useCreateOrUpdate } from "../hooks/useCreateOrUpdate";
import useConfirmDelete from "../hooks/useConfirmDelete";

const HomeScreen = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const {
    data: notes,
    error,
    isLoading,
    setData: setNotes,
  } = useFetch(notesService.fetchNotes, []);
  const confirmDelete = useConfirmDelete();
  const createOrUpdate = useCreateOrUpdate();

  const deleteNote = async () => {
    if (!selectedNote?.id) return;
    createOrUpdate({
      fn: notesService.deleteNoteById,
      args: [selectedNote.id],
      successCb: () => {
        setNotes((notes ?? []).filter((note) => note.id !== selectedNote.id));
      },
      successMessage: "Note deleted successfully",
      errorMessage: "Something went wrong",
    });
  };

  if (isLoading) return <FullScreenLoader />;

  return (
    <>
      <View style={styles.container}>
        {(notes?.length ?? 0) === 0 ? (
          <EmptyState text="No notes found!" />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={notes ?? []}
            renderItem={({ item }) => (
              <NoteItem
                note={item}
                showActions={(note) => {
                  setIsBottomSheetOpen(true);
                  setSelectedNote(note);
                }}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        )}

        <View style={styles.footer}>
          <Button
            onPress={() => setIsAddModalOpen(true)}
            customStyles={styles.addButton}
            circle
          >
            <FontAwesome name="plus" size={30} color="white" />
          </Button>
        </View>
      </View>

      <NoteFormModal
        visible={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add a new note"
        callback={(note) => {
          setNotes([note, ...(notes ?? [])]);
        }}
      />

      <BottomAction
        isOpen={isBottomSheetOpen}
        setIsOpen={setIsBottomSheetOpen}
        onDelete={() => {
          setIsBottomSheetOpen(false);
          confirmDelete(deleteNote);
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
  addButton: {
    position: "absolute",
    right: 10,
    bottom: 0,
  },
  footer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
});
