import renderer from "react-test-renderer";
import { FullScreenLoader } from "../FullScreenLoader/FullScreenLoader";

describe(`${FullScreenLoader}.name`, () => {
  test("renders correctly", () => {
    const tree = renderer.create(<FullScreenLoader />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
