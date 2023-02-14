import { ScrollView } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import useFetch from "../hooks/useFetch";
import notesService from "../services/notes.service";
import { FullScreenLoader } from "../components/Loader/FullScreenLoader";
import { useState } from "react";
import useCustomHeader from "../hooks/useCustomHeader";
import { HeaderLeft } from "../components/Notes/NoteDetails/Header/HeaderLeft";
import { HeaderRight } from "../components/Notes/NoteDetails/Header/HeaderRight";
import { NoteDetails as NoteSummary } from "../components/Notes/NoteDetails/NoteDetails";
import { NoteFormModal } from "../components/Notes/NoteFormModal";
import { useCreateOrUpdate } from "../hooks/useCreateOrUpdate";

type ProfileScreenRouteProp = RouteProp<
  RootStackParamList,
  "NoteDetailsScreen"
>;

type NoteDetailsProps = {
  route: ProfileScreenRouteProp;
};

const NoteDetails = ({ route }: NoteDetailsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigation = useNavigation();
  const { noteId: id } = route.params;
  const createOrUpdate = useCreateOrUpdate();

  const {
    data: note,
    isLoading,
    error,
    setData: setNote,
  } = useFetch(() => notesService.fetchNoteById(id), [id]);

  const deleteNote = async () => {
    createOrUpdate({
      fn: notesService.deleteNoteById,
      args: [id],
      successCb: () => {
        setNote(null);
        navigation.goBack();
      },
      successMessage: "Note deleted successfully",
      errorMessage: "Something went wrong",
    });
  };

  useCustomHeader({
    headerLeft: <HeaderLeft />,
    headerRight: (
      <HeaderRight onDelete={deleteNote} onEdit={() => setIsModalOpen(true)} />
    ),
  });

  if (isLoading) return <FullScreenLoader />;

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "white" }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {note && <NoteSummary note={note} />}
      </ScrollView>

      <NoteFormModal
        visible={isModalOpen}
        defaultValues={note ?? undefined}
        isEditing
        onClose={setIsModalOpen}
        title="Update note"
        callback={(note) => {
          setNote(note);
        }}
      />
    </>
  );
};

export default NoteDetails;
