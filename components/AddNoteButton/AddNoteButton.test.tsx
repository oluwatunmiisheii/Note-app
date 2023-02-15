import renderer from "react-test-renderer";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { AddNoteButton } from "./AddNoteButton";

const defaultProps = {
  onAddButtonPress: jest.fn(),
};

describe(`${AddNoteButton}`, () => {
  it("renders correctly", () => {
    const tree = renderer.create(<AddNoteButton {...defaultProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("calls onAddButtonPress when button is pressed", () => {
    render(<AddNoteButton {...defaultProps} />);
    const button = screen.getByTestId("add-note-button");
    fireEvent(button, "onPress");
    expect(defaultProps.onAddButtonPress).toHaveBeenCalled();
  });
});
