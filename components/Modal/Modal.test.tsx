import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { Modal } from "./Modal";
import { Text } from "react-native";

const onClose = jest.fn();
const title = "Modal Title";
const children = <Text>Modal Content</Text>;

const defaultProps: React.ComponentProps<typeof Modal> = {
  visible: true,
  onClose,
  title,
  children,
};

const create = (props: Partial<typeof defaultProps> = defaultProps) => {
  const tree = renderer
    .create(<Modal {...{ ...defaultProps, ...props }} />)
    .toJSON();
  return { props, tree };
};

const setup = (props: Partial<typeof defaultProps> = defaultProps) => {
  const utils = render(<Modal {...{ ...defaultProps, ...props }} />);
  return { props, ...utils };
};

describe(`<${Modal.name}>`, () => {
  test("renders correctly", () => {
    const { tree } = create();
    expect(tree).toMatchSnapshot();
  });

  test("renders title", async () => {
    setup();
    expect(screen.getByText(title)).toBeOnTheScreen();
  });

  test("renders children", async () => {
    setup();
    expect(screen.getByText("Modal Content")).toBeOnTheScreen();
  });

  test("should call onClose when you press close button", async () => {
    setup();
    const button = screen.getByLabelText("close");
    fireEvent.press(button);
    expect(onClose).toHaveBeenCalled();
  });
});
