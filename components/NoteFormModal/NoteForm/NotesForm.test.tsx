import {
  render,
  fireEvent,
  screen,
  waitFor,
} from "@testing-library/react-native";
import notesService from "@/services/note/notes.service";

import { NotesForm } from "./NotesForm";
import { getNote } from "@/services/note/__mock_data__/notes.mock";
import { Alert } from "react-native";

const mockOnSubmit = jest.fn();
const defaultProps: React.ComponentProps<typeof NotesForm> = {
  onSubmit: mockOnSubmit,
};
const setup = (props: Partial<typeof defaultProps> = defaultProps) => {
  const utils = render(<NotesForm {...{ ...defaultProps, ...props }} />);
  return { ...utils };
};

afterEach(() => {
  jest.clearAllMocks();
});

const createNotesSpy = jest.spyOn(notesService, "createNote");
const updateNoteSpy = jest.spyOn(notesService, "updateNoteById");

describe(`<${NotesForm.name}>`, () => {
  describe("validation", () => {
    test("should validate title", () => {
      setup();
      const titleInput = screen.getByTestId("title-input");
      fireEvent.changeText(titleInput, "");
      fireEvent(titleInput, "blur");
      expect(titleInput.props.value).toBe("");

      expect(screen.getByText("Title is required")).toBeTruthy();
    });

    test("should validate description", () => {
      setup();
      const descriptionInput = screen.getByTestId("description-input");
      fireEvent.changeText(descriptionInput, "");
      fireEvent(descriptionInput, "blur");
      expect(descriptionInput.props.value).toBe("");

      expect(screen.getByText("Description is required")).toBeTruthy();
    });

    test("should validate note", () => {
      setup();
      const noteInput = screen.getByTestId("note-input");
      fireEvent.changeText(noteInput, "");
      fireEvent(noteInput, "blur");
      expect(noteInput.props.value).toBe("");

      expect(screen.getByText("Note is required")).toBeTruthy();
    });
  });

  describe("submit form >", () => {
    describe("api call is successful", () => {
      test("isEditing is false > call create note service", async () => {
        const alertSpy = spyOnAlert();
        const spy = createNotesSpy.mockResolvedValueOnce({ name: "1" });
        setup();

        getAndUpdateInput();

        const submitButton = screen.getByTestId("submit-button");
        fireEvent.press(submitButton);

        expect(spy).toHaveBeenCalled();

        await waitFor(() => {
          expect(mockOnSubmit).toHaveBeenCalled();
        });

        expect(alertSpy).toHaveBeenCalled();

        const [title, message] = alertSpy.mock.calls[0];

        expect(title).toBe("Success");
        expect(message).toBe("Note created successfully");
      });

      test("isEditing is true > call update note service", async () => {
        const alertSpy = spyOnAlert();

        const spy = updateNoteSpy.mockResolvedValueOnce({ ...getNote() });

        setup({ isEditing: true });

        getAndUpdateInput();

        const submitButton = screen.getByTestId("submit-button");
        fireEvent.press(submitButton);

        expect(spy).toHaveBeenCalled();

        await waitFor(() => {
          expect(mockOnSubmit).toHaveBeenCalled();
        });

        expect(alertSpy).toHaveBeenCalled();

        const [title, message] = alertSpy.mock.calls[0];

        expect(title).toBe("Success");
        expect(message).toBe("Note updated successfully");
      });
    });

    describe("api call is unsuccessful", () => {
      test("isEditing is false > call create note service", async () => {
        const alertSpy = spyOnAlert();

        const spy = createNotesSpy.mockRejectedValueOnce({});

        setup();

        getAndUpdateInput();

        const submitButton = screen.getByTestId("submit-button");
        fireEvent.press(submitButton);

        expect(spy).toHaveBeenCalled();

        await waitFor(() => {
          expect(mockOnSubmit).not.toHaveBeenCalled();
        });

        expect(alertSpy).toHaveBeenCalled();

        const [title, message] = alertSpy.mock.calls[0];

        expect(title).toBe("Error");
        expect(message).toBe("Something went wrong");
      });

      test("isEditing is true > call update note service", async () => {
        const alertSpy = spyOnAlert();

        const spy = updateNoteSpy.mockRejectedValueOnce({});

        setup({ isEditing: true });

        getAndUpdateInput();

        const submitButton = screen.getByTestId("submit-button");
        fireEvent.press(submitButton);

        expect(spy).toHaveBeenCalled();

        await waitFor(() => {
          expect(mockOnSubmit).not.toHaveBeenCalled();
        });

        expect(alertSpy).toHaveBeenCalled();

        const [title, message] = alertSpy.mock.calls[0];

        expect(title).toBe("Error");
        expect(message).toBe("Something went wrong");
      });
    });
  });

  describe("default values are provided as props >", () => {
    test("should set default values", () => {
      const note = getNote();
      setup({ defaultValues: { ...note } });

      const titleInput = screen.getByTestId("title-input");
      const descriptionInput = screen.getByTestId("description-input");
      const noteInput = screen.getByTestId("note-input");

      expect(titleInput.props.value).toBe(note.title);
      expect(descriptionInput.props.value).toBe(note.description);
      expect(noteInput.props.value).toBe(note.note);
    });
  });
});

const getAndUpdateInput = () => {
  const titleInput = screen.getByTestId("title-input");
  const descriptionInput = screen.getByTestId("description-input");
  const noteInput = screen.getByTestId("note-input");

  fireEvent.changeText(titleInput, "title");
  fireEvent.changeText(descriptionInput, "description");
  fireEvent.changeText(noteInput, "note");
};

const spyOnAlert = () => {
  return jest.spyOn(Alert, "alert");
};
