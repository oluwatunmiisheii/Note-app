import renderer from "react-test-renderer";
import { EmptyState } from "./EmptyState";
import React from "react";
import { render } from "@testing-library/react-native";

const title = "Empty State Title";
const description = "Empty State Description";

describe(`<${EmptyState.name}>`, () => {
  test("renders correctly", () => {
    const tree = renderer
      .create(
        React.createElement(EmptyState, {
          title,
        })
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("renders title passed as props", () => {
    const { getByText } = render(
      React.createElement(EmptyState, {
        title,
      })
    );
    expect(getByText(title)).toBeOnTheScreen();
  });

  describe("description", () => {
    test("renders description passed as props", () => {
      const { getByText } = render(
        React.createElement(EmptyState, {
          title,
          description,
        })
      );
      expect(getByText(description)).toBeOnTheScreen();
    });

    test("does not render description if not passed as props", () => {
      const { queryByText } = render(
        React.createElement(EmptyState, {
          title,
        })
      );
      expect(queryByText(description)).not.toBeOnTheScreen();
    });
  });
});
