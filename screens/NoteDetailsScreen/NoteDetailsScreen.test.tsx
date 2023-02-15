import navigation from "@/navigation";
import notesService from "@/services/note/notes.service";
import { notes, getRandomNote } from "@/services/note/__mock_data__/notes.mock";
import { renderNavigator } from "@/test-utils";
import { fireEvent, screen, waitFor } from "@testing-library/react-native";
import NoteDetailsScreen, { ProfileScreenRouteProp } from "./NoteDetailsScreen";

const fetchNoteSpy = jest.spyOn(notesService, "fetchNoteById");

afterEach(() => {
  jest.clearAllMocks();
});

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({
    goBack: jest.fn(),
    setOptions: jest.fn().mockImplementation((options) => options),
  }),
}));

const noteId = getRandomNote().id;

const routeProps: ProfileScreenRouteProp = {
  key: "NoteDetailsScreen",
  name: "NoteDetailsScreen",
  params: { noteId },
};

describe("NoteDetailsScreen", () => {
  // mock that the promise is still loading
  fetchNoteSpy.mockImplementation(() => new Promise(() => {}));
  it("renders loading state", () => {
    renderNavigator(<NoteDetailsScreen route={routeProps} />);
    expect(screen.getByTestId("fullscreen-loader")).toBeTruthy();
  });

  test.each(notes)("renders note", async (note) => {
    fetchNoteSpy.mockResolvedValueOnce(note);
    renderNavigator(<NoteDetailsScreen route={routeProps} />);
    const title = await screen.findByText(note.title);
    expect(title).toBeTruthy();
  });

  test("renders error state", async () => {
    fetchNoteSpy.mockRejectedValueOnce(new Error("Something went wrong"));
    renderNavigator(<NoteDetailsScreen route={routeProps} />);
    const emptyState = await screen.findByText("Something went wrong 😢");
    expect(emptyState).toBeTruthy();
  });
});
