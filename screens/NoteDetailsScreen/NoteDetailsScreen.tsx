import { ScrollView } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/types";
import useFetch from "@/hooks/useFetch";
import notesService from "@/services/note/notes.service";
import { FullScreenLoader } from "@/components/Common/Loader/FullScreenLoader/FullScreenLoader";
import { useState } from "react";
import useCustomHeader from "@/hooks/useCustomHeader";
import { HeaderLeft } from "@/components/NoteDetails/Header/HeaderLeft/HeaderLeft";
import { HeaderRight } from "@/components/NoteDetails/Header/HeaderRight/HeaderRight";
import { NoteDetails } from "@/components/NoteDetails/NoteDetails";
import { NoteFormModal } from "@/components/NoteFormModal/NoteFormModal";
import { EmptyState } from "@/components/Common/EmptyState/EmptyState";
import { useNote } from "@/hooks/useNote";

export type ProfileScreenRouteProp = RouteProp<
  RootStackParamList,
  "NoteDetailsScreen"
>;

type NoteDetailsProps = {
  route: ProfileScreenRouteProp;
};

const NoteDetailsScreen = ({ route }: NoteDetailsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigation = useNavigation();
  const { noteId: id } = route.params;
  const { deleteNote } = useNote();

  const {
    data: note,
    isLoading,
    error,
    setData: setNote,
  } = useFetch(() => notesService.fetchNoteById(id), [id]);

  const handleDeleteNote = async () => {
    deleteNote({
      noteId: id,
      onSuccess: () => {
        setNote(null);
        navigation.goBack();
      },
    });
  };

  useCustomHeader({
    headerLeft: <HeaderLeft />,
    headerRight: (
      <HeaderRight
        onDelete={handleDeleteNote}
        onEdit={() => setIsModalOpen(true)}
      />
    ),
  });

  if (isLoading) return <FullScreenLoader />;

  if (error) return <EmptyState title="Something went wrong 😢" />;

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "white" }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {note && <NoteDetails note={note} />}
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

export default NoteDetailsScreen;
