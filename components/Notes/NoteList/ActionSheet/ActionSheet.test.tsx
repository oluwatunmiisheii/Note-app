import renderer from "react-test-renderer";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { BottomAction } from "./ActionSheet";

const setIsOpen = jest.fn();
const onDelete = jest.fn();

const defaultProps: React.ComponentProps<typeof BottomAction> = {
  isOpen: true,
  setIsOpen,
  onDelete,
};

const create = (props: Partial<typeof defaultProps> = defaultProps) => {
  const tree = renderer
    .create(<BottomAction {...{ ...defaultProps, ...props }} />)
    .toJSON();
  return { props, tree };
};

const setup = (props: Partial<typeof defaultProps> = defaultProps) => {
  const utils = render(<BottomAction {...{ ...defaultProps, ...props }} />);
  return { props, ...utils };
};

describe(`<${BottomAction.name}>`, () => {
  test("renders correctly", () => {
    const { tree } = create();
    expect(tree).toMatchSnapshot();
  });

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
