import { screen, fireEvent } from "@testing-library/react-native";
import { getNote } from "../../../../services/note/__mock_data__/notes.mock";
import { NoteItem } from "./NoteItem";
import { createNavigator, renderNavigator } from "../../../../test-utils";

const note = getNote();
const showActions = jest.fn();

const defaultProps: React.ComponentProps<typeof NoteItem> = {
  note,
  showActions,
};

const create = (props: Partial<typeof defaultProps> = defaultProps) => {
  const { tree } = createNavigator(
    <NoteItem {...{ ...defaultProps, ...props }} />
  );
  return { props, tree };
};

const setup = (props: Partial<typeof defaultProps> = defaultProps) => {
  const utils = renderNavigator(
    <NoteItem {...{ ...defaultProps, ...props }} />
  );
  return { props, ...utils };
};

const mockNavigate = jest.fn();

// mock navigation
jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: jest.fn(() => ({
    navigate: mockNavigate,
  })),
}));

describe(`<${NoteItem.name}>`, () => {
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

  test("should redirect to note details page on tap", async () => {
    setup();
    const trigger = screen.getByText(note.title);
    fireEvent(trigger, "press");
    expect(mockNavigate).toBeCalledTimes(1);
  });
});
