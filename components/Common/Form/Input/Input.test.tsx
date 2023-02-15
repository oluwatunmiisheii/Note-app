import { render, screen, fireEvent } from "@testing-library/react-native";
import { Input } from "./Input";

const onChangeText = jest.fn();
const value = "Value";
const label = "Label";

const defaultProps: React.ComponentProps<typeof Input> = {
  label,
  value,
  onChangeText,
};

const setup = (props: Partial<typeof defaultProps> = defaultProps) => {
  const utils = render(<Input {...{ ...defaultProps, ...props }} />);
  return { props, ...utils };
};

describe(`<${Input.name}>`, () => {
  test("renders label", async () => {
    setup();
    expect(screen.getByText(label)).toBeOnTheScreen();
  });

  test("renders value", async () => {
    setup();
    const input = screen.getByLabelText("input");
    fireEvent.changeText(input, "New Value");
    expect(input.props.value).toBe(value);
  });

  test("should call onChangeText when you type", async () => {
    setup();
    const input = screen.getByLabelText("input");
    fireEvent.changeText(input, "New Value");
    expect(onChangeText).toHaveBeenCalled();
  });
});
