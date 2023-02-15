import renderer from "react-test-renderer";
import {
  render,
  fireEvent,
  screen,
  waitFor,
} from "@testing-library/react-native";
import notesService from "../../services/note/notes.service";

import { NotesForm } from "./NotesForm";
import { getNote } from "../../services/note/__mock_data__/notes.mock";

const mockOnSubmit = jest.fn();

const defaultProps: React.ComponentProps<typeof NotesForm> = {
  onSubmit: mockOnSubmit,
};

const create = (props: Partial<typeof defaultProps> = defaultProps) => {
  const tree = renderer
    .create(<NotesForm {...{ ...defaultProps, ...props }} />)
    .toJSON();
  return { tree };
};

const setup = (props: Partial<typeof defaultProps> = defaultProps) => {
  const utils = render(<NotesForm {...{ ...defaultProps, ...props }} />);
  return { ...utils };
};

afterEach(() => {
  jest.clearAllMocks();
});

describe(`<${NotesForm.name}>`, () => {
  test("renders correctly", () => {
    const { tree } = create();
    expect(tree).toMatchSnapshot();
  });

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

  describe("submit", () => {
    test("should call create note when isEditing is false or undefined", async () => {
      const createNoteSpy = jest
        .spyOn(notesService, "createNote")
        .mockImplementation(() => Promise.resolve({ name: "1" }));

      setup();

      getAndUpdateInput();

      const submitButton = screen.getByTestId("submit-button");
      fireEvent.press(submitButton);

      expect(createNoteSpy).toHaveBeenCalled();

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalled();
      });
    });

    test("should call update note when isEditing is true", async () => {
      const updateNoteSpy = jest
        .spyOn(notesService, "updateNoteById")
        .mockImplementation(() =>
          Promise.resolve({
            name: "1",
            title: "title",
            description: "description",
            note: "note",
            date: new Date(),
          })
        );

      setup({ isEditing: true });

      getAndUpdateInput();

      const submitButton = screen.getByTestId("submit-button");
      fireEvent.press(submitButton);

      expect(updateNoteSpy).toHaveBeenCalled();

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalled();
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
