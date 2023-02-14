import { Note } from "../../models/note.model";
import { CustomModal } from "../Modal/Modal";
import { NotesForm } from "./NotesForm";

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
      <CustomModal visible={visible} onClose={closeModal} title={title}>
        <NotesForm
          isEditing={isEditing}
          defaultValues={defaultValues}
          onSubmit={(note) => {
            callback(note);
            closeModal();
          }}
        />
      </CustomModal>
    </>
  );
};
