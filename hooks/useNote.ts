import { CreateNoteDto, Note } from "@/models/note.model";
import notesService from "@/services/note/notes.service";
import { useCreateOrUpdate } from "./useCreateOrUpdate";

type CreateNoteArgs = {
  payload: CreateNoteDto;
  onSuccess: (res: { name: string }) => void;
};

type UpdateNoteArgs = {
  payload: CreateNoteDto;
  noteId: string;
  onSuccess: (res: Note) => void;
};

type DeleteNoteArgs = {
  noteId: string;
  onSuccess: () => void;
};

export const useNote = () => {
  const createOrUpdate = useCreateOrUpdate();

  const createNote = async ({
    payload,
    onSuccess,
  }: CreateNoteArgs): Promise<void> => {
    createOrUpdate({
      fn: notesService.createNote,
      args: [payload],
      successCb: (res) => {
        onSuccess(res);
      },
      successMessage: "Note created successfully",
      errorMessage: "Something went wrong",
    });
  };

  const updateNote = async ({
    payload,
    noteId,
    onSuccess,
  }: UpdateNoteArgs): Promise<void> => {
    createOrUpdate({
      fn: notesService.updateNoteById,
      args: [noteId, payload],
      successCb: (res) => {
        onSuccess({
          ...res,
          id: noteId,
          date: new Date(res.date),
        });
      },
      successMessage: "Note updated successfully",
      errorMessage: "Something went wrong",
    });
  };

  const deleteNote = async ({ noteId, onSuccess }: DeleteNoteArgs) => {
    createOrUpdate({
      fn: notesService.deleteNoteById,
      args: [noteId],
      successCb: onSuccess,
      successMessage: "Note deleted successfully",
      errorMessage: "Something went wrong",
    });
  };

  return {
    createNote,
    updateNote,
    deleteNote,
  };
};
