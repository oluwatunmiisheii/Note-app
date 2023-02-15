import { notes } from "@/services/note/__mock_data__/notes.mock";
import { render } from "@testing-library/react-native";
import { NoteList } from "./NoteList";
import { getFormattedDate } from "@/utils/date/date.util";

const noNoteTitle = "No notes found!";
const noNoteDescription = "You can add a new note by clicking the + button";

const defaultProps: React.ComponentProps<typeof NoteList> = {
  notes,
  onLongPress: () => {},
};

const setup = (props: Partial<typeof defaultProps> = defaultProps) => {
  const utils = render(<NoteList {...{ ...defaultProps, ...props }} />);
  return { ...utils };
};

describe(`<${NoteList.name}>`, () => {
  test("no notes provided > render empty state", () => {
    const { getByText } = setup({ notes: [] });
    expect(getByText(noNoteTitle)).toBeOnTheScreen();
    expect(getByText(noNoteDescription)).toBeOnTheScreen();
  });

  test.each(notes)("note provided as props > render notes", (note) => {
    const { getByText } = setup({ notes: [note] });
    expect(getByText(note.title)).toBeOnTheScreen();
    expect(getByText(note.description)).toBeOnTheScreen();
    expect(getByText(getFormattedDate(note.date))).toBeOnTheScreen();
  });
});
