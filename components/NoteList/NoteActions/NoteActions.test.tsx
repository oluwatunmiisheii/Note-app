import { fireEvent, render, screen } from "@testing-library/react-native";
import { NoteActions } from "./NoteActions";

const setIsOpen = jest.fn();
const onDelete = jest.fn();

const defaultProps: React.ComponentProps<typeof NoteActions> = {
  isOpen: true,
  setIsOpen,
  onDelete,
};

const setup = (props: Partial<typeof defaultProps> = defaultProps) => {
  const utils = render(<NoteActions {...{ ...defaultProps, ...props }} />);
  return { props, ...utils };
};

describe(`<${NoteActions.name}>`, () => {
  test("should not render if isOpen is false", async () => {
    setup({ isOpen: false });
    expect(screen.queryByText("Delete")).not.toBeOnTheScreen();
    expect(screen.queryByText("Cancel")).not.toBeOnTheScreen();
  });

  test("should hide actionSheet when cancel button is called", async () => {
    setup();
    const button = screen.getByText("Cancel");
    fireEvent.press(button);
    expect(setIsOpen).toBeCalledWith(false);
  });

  test("should call onDelete when delete button is pressed", async () => {
    setup();
    const button = screen.getByText("Delete");
    fireEvent.press(button);
    expect(onDelete).toBeCalled();
  });
});
