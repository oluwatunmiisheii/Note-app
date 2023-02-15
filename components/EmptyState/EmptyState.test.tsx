import renderer from "react-test-renderer";
import { EmptyState } from "./EmptyState";
import React from "react";
import { render } from "@testing-library/react-native";

const text = "Empty State Title";
describe(`<${EmptyState.name}>`, () => {
  test("renders correctly", () => {
    const tree = renderer
      .create(
        React.createElement(EmptyState, {
          text,
        })
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("renders the correct text passed as props", () => {
    const { getByText } = render(
      React.createElement(EmptyState, {
        text,
      })
    );
    expect(getByText(text)).toBeOnTheScreen();
  });
});
