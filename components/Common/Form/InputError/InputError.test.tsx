import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react-native";

import { InputError } from "./InputError";

describe(`${InputError}.name`, () => {
  test("renders correctly", () => {
    const tree = renderer.create(<InputError error="Error" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("renders error", () => {
    render(<InputError error="Error" />);
    expect(screen.getByText("Error")).toBeTruthy();
  });
});
