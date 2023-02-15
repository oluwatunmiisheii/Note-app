import renderer from "react-test-renderer";
import colors from "../../../utils/constants/colors";
import { Button, Variant } from "./Button";

describe(`<${Button.name}>`, () => {
  test("renders correctly", () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("renders the correct variant when no variant is provided", () => {
    const tree = renderer.create(<Button />).toJSON();
    // @ts-ignore
    expect(tree.props.style[0][1].backgroundColor).toEqual(colors.primary);
  });

  test.each([
    [Variant.primary, colors.primary],
    [Variant.secondary, colors.secondary],
    [Variant.plain, "transparent"],
  ])(
    "renders the correct variant when %s is provided",
    (variant: Variant, color: string) => {
      const tree = renderer.create(<Button variant={variant} />).toJSON();
      // @ts-ignore
      expect(tree.props.style[0][1].backgroundColor).toEqual(color);
    }
  );
});
