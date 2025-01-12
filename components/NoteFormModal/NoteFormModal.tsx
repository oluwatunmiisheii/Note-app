import { Note } from "@/models/note.model";
import { Modal } from "@/components/Common/Modal/Modal";
import { NotesForm } from "./NoteForm/NotesForm";

type NoteFormModalProps = Parameters<typeof NotesForm>[0] & {
  visible: boolean;
  onClose: (state: boolean) => void;
  title: string;
  callback: (note: Note) => void;
};

export const NoteFormModal = (props: NoteFormModalProps) => {
  const { visible, onClose, title, callback, isEditing, defaultValues } = props;
  const closeModal = () => onClose(false);

  return (
    <>
      <Modal visible={visible} onClose={closeModal} title={title}>
        <NotesForm
          isEditing={isEditing}
          defaultValues={defaultValues}
          onSubmit={(note) => {
            callback(note);
            closeModal();
          }}
        />
      </Modal>
    </>
  );
};
