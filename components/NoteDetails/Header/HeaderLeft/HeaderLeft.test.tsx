import { render, screen, fireEvent } from "@testing-library/react-native";
import { HeaderLeft } from "./HeaderLeft";

const setup = () => {
  const utils = render(<HeaderLeft />);
  return { ...utils };
};

const mockGoBack = jest.fn();

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(() => ({
    goBack: mockGoBack,
  })),
}));

describe(`<${HeaderLeft.name}>`, () => {
  test("should redirect to previous page on tap", async () => {
    setup();
    const trigger = screen.getByLabelText("go to previous page");

    fireEvent(trigger, "press");

    expect(mockGoBack).toBeCalledTimes(1);
  });
});
