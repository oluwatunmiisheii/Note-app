import { useState } from "react";
import { Text } from "react-native";
import { Note } from "@/models/note.model";
import { Button } from "@/components/Common/Button/Button";
import { Input } from "@/components/Common/Form/Input/Input";
import { useNote } from "@/hooks/useNote";

interface NotesFormProps {
  onSubmit?: (payload: Note) => void;
  isEditing?: boolean;
  defaultValues?: Note;
}

export const NotesForm = (props: NotesFormProps) => {
  const { onSubmit, isEditing, defaultValues } = props;
  const { createNote, updateNote } = useNote();
  const [inputs, setInputs] = useState({
    title: {
      value: defaultValues?.title ?? "",
      isValid: true,
    },
    description: {
      value: defaultValues?.description ?? "",
      isValid: true,
    },
    note: {
      value: defaultValues?.note ?? "",
      isValid: true,
    },
  });

  const handleInputChange = (value: string, name: string) => {
    setInputs((currentInputs) => ({
      ...currentInputs,
      [name]: {
        value,
        isValid: value.trim().length > 0,
      },
    }));
  };

  const validateFields = () => {
    const { title, description, note } = inputs;

    const titleIsValid = title.value.trim().length > 0;
    const descriptionIsValid = description.value.trim().length > 0;
    const noteIsValid = note.value.trim().length > 0;

    if (!titleIsValid || !descriptionIsValid || !noteIsValid) {
      setInputs((currentInputs) => {
        return {
          title: {
            value: currentInputs.title.value,
            isValid: titleIsValid,
          },
          description: {
            value: currentInputs.description.value,
            isValid: descriptionIsValid,
          },
          note: {
            value: currentInputs.note.value,
            isValid: noteIsValid,
          },
        };
      });
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    const { title, description, note } = inputs;

    const isValid = validateFields();

    if (!isValid) return;

    const payload = {
      title: title.value,
      description: description.value,
      note: note.value,
      date: defaultValues?.date ?? new Date(),
    };

    if (!isEditing) {
      createNote({
        payload,
        onSuccess: ({ name }) => {
          onSubmit?.({ ...payload, id: name });
        },
      });
    } else {
      updateNote({
        payload,
        noteId: defaultValues?.id ?? "",
        onSuccess: (note) => {
          onSubmit?.({
            ...note,
            id: defaultValues?.id ?? "",
            date: new Date(note.date),
          });
        },
      });
    }
  };

  return (
    <>
      <Input
        label="Title"
        onChangeText={(text) => handleInputChange(text, "title")}
        value={inputs.title.value}
        maxLength={50}
        testID="title-input"
        error={!inputs.title.isValid ? "Title is required" : undefined}
      />
      <Input
        label="Description"
        onChangeText={(text) => handleInputChange(text, "description")}
        value={inputs.description.value}
        multiline
        maxLength={200}
        testID="description-input"
        extraStyles={{ height: 100 }}
        error={
          !inputs.description.isValid ? "Description is required" : undefined
        }
      />
      <Input
        label="Note"
        onChangeText={(text) => handleInputChange(text, "note")}
        value={inputs.note.value}
        testID="note-input"
        extraStyles={{ height: "auto", minHeight: 250 }}
        error={!inputs.note.isValid ? "Note is required" : undefined}
        multiline
      />

      <Button
        onPress={handleSubmit}
        customStyles={{
          marginTop: 30,
        }}
        testID="submit-button"
      >
        <Text style={{ color: "white" }}>{isEditing ? "Update" : "Save"}</Text>
      </Button>
    </>
  );
};
