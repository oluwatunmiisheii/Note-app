import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { HeaderLeft } from "./HeaderLeft";

const create = () => {
  const tree = renderer.create(<HeaderLeft />).toJSON();
  return { tree };
};

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
  test("renders correctly", () => {
    const { tree } = create();
    expect(tree).toMatchSnapshot();
  });

  test("should redirect to previous page on tap", async () => {
    setup();
    const trigger = screen.getByLabelText("go to previous page");

    fireEvent(trigger, "press");

    expect(mockGoBack).toBeCalledTimes(1);
  });
});
