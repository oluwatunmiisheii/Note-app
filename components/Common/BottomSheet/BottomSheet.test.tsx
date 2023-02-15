import { render, screen } from "@testing-library/react-native";
import { BottomSheet } from "./BottomSheet";
import { Text } from "react-native";

const setIsOpen = jest.fn();
const children = <Text>Test</Text>;

const defaultProps: React.ComponentProps<typeof BottomSheet> = {
  isOpen: true,
  children,
  setIsOpen: setIsOpen,
};

const setup = (props: Partial<typeof defaultProps> = defaultProps) => {
  const utils = render(<BottomSheet {...{ ...defaultProps, ...props }} />);
  return { props, ...utils };
};

describe(`<${BottomSheet.name}>`, () => {
  test("renders children", async () => {
    setup();
    expect(screen.getByText("Test")).toBeOnTheScreen();
  });

  test("should not render if isOpen is false", async () => {
    setup({ isOpen: false });
    expect(screen.queryByText("Test")).not.toBeOnTheScreen();
  });
});
