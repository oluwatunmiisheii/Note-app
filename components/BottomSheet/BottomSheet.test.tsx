import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { BottomSheet } from "./BottomSheet";
import { Text } from "react-native";

const setIsOpen = jest.fn();
const children = <Text>Test</Text>;

const defaultProps: React.ComponentProps<typeof BottomSheet> = {
  isOpen: true,
  children,
  setIsOpen: setIsOpen,
};

const create = (props: Partial<typeof defaultProps> = defaultProps) => {
  const tree = renderer
    .create(<BottomSheet {...{ ...defaultProps, ...props }} />)
    .toJSON();
  return { props, tree };
};

const setup = (props: Partial<typeof defaultProps> = defaultProps) => {
  const utils = render(<BottomSheet {...{ ...defaultProps, ...props }} />);
  return { props, ...utils };
};

describe(`<${BottomSheet.name}>`, () => {
  test("renders correctly", () => {
    const { tree } = create();
    expect(tree).toMatchSnapshot();
  });

  test("renders children", async () => {
    setup();
    expect(screen.getByText("Test")).toBeOnTheScreen();
  });

  test("should not render if isOpen is false", async () => {
    setup({ isOpen: false });
    expect(screen.queryByText("Test")).not.toBeOnTheScreen();
  });
});
