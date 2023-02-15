import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react-native";
import { getNote } from "../../../services/note/__mock_data__/notes.mock";
import { NoteDetails } from "./NoteDetails";
import { getFormattedDate } from "../../../utils/date";

const note = getNote();

const defaultProps: React.ComponentProps<typeof NoteDetails> = {
  note,
};

const create = (props = defaultProps) => {
  const tree = renderer.create(<NoteDetails {...props} />).toJSON();
  return { props, tree };
};

const setup = (props = defaultProps) => {
  const utils = render(<NoteDetails {...props} />);
  return { props, ...utils };
};

describe(`<${NoteDetails.name}>`, () => {
  test("renders correctly", () => {
    const { tree } = create();
    expect(tree).toMatchSnapshot();
  });

  test("renders note title", () => {
    setup();
    expect(screen.getByText(note.title)).toBeOnTheScreen();
  });

  test("renders note description", () => {
    setup();
    expect(screen.getByText(note.description)).toBeOnTheScreen();
  });

  test("renders note date", () => {
    setup();
    expect(screen.getByText(getFormattedDate(note.date))).toBeOnTheScreen();
  });

  test("renders note note", () => {
    setup();
    expect(screen.getByText(note.note)).toBeOnTheScreen();
  });
});
