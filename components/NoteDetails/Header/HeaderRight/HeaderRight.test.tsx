import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { HeaderRight } from "./HeaderRight";
import { Alert, AlertButton } from "react-native";
import { defaultConfirmDeleteText } from "../../../../hooks/useConfirmDelete";

const mockOnEdit = jest.fn();
const mockOnDelete = jest.fn();

const defaultProps: React.ComponentProps<typeof HeaderRight> = {
  onEdit: mockOnEdit,
  onDelete: mockOnDelete,
};

const create = () => {
  const tree = renderer.create(<HeaderRight {...defaultProps} />).toJSON();
  return { tree };
};

const setup = () => {
  const utils = render(<HeaderRight {...defaultProps} />);
  return { ...utils };
};

describe(`<${HeaderRight.name}>`, () => {
  test("renders correctly", () => {
    const { tree } = create();
    expect(tree).toMatchSnapshot();
  });

  test("should call onEdit on edit button press", () => {
    setup();
    const trigger = screen.getByLabelText("edit note");
    fireEvent(trigger, "press");
    expect(mockOnEdit).toBeCalledTimes(1);
  });

  test("should call onDelete on delete button press", async () => {
    const spy = jest.spyOn(Alert, "alert");
    setup();

    const trigger = screen.getByLabelText("delete note");
    fireEvent(trigger, "press");
    expect(spy).toBeCalledTimes(1);

    const [title, message, buttons] = spy.mock.calls[0];

    expect(title).toBe("Delete");
    expect(message).toBe(defaultConfirmDeleteText);
    expect(buttons).toHaveLength(2);

    const [cancelButton, deleteButton] = buttons as AlertButton[];

    expect(cancelButton.text).toBe("Cancel");
    expect(deleteButton.text).toBe("Delete");

    // @ts-ignore
    deleteButton.onPress();

    expect(mockOnDelete).toBeCalledTimes(1);
  });
});
