import renderer from "react-test-renderer";

import { NoteFormModal } from "./NoteFormModal";

const mockOnClose = jest.fn();
const mockCallback = jest.fn();

const defaultProps: React.ComponentProps<typeof NoteFormModal> = {
  visible: true,
  onClose: mockOnClose,
  title: "title",
  callback: mockCallback,
};

const create = (props: Partial<typeof defaultProps> = defaultProps) => {
  const tree = renderer
    .create(<NoteFormModal {...{ ...defaultProps, ...props }} />)
    .toJSON();
  return { tree };
};

describe(`<${NoteFormModal.name}>`, () => {
  test("renders correctly", () => {
    const { tree } = create();
    expect(tree).toMatchSnapshot();
  });
});
