import notesService from "@/services/note/notes.service";
import { notes } from "@/services/note/__mock_data__/notes.mock";
import { renderNavigator } from "@/test-utils";
import { fireEvent, screen } from "@testing-library/react-native";
import HomeScreen from "./HomeScreen";

const fetchNotesSpy = jest.spyOn(notesService, "fetchNotes");

afterEach(() => {
  jest.clearAllMocks();
});

describe("HomeScreen", () => {
  it("renders loading state", () => {
    renderNavigator(<HomeScreen />);
    expect(screen.getByTestId("fullscreen-loader")).toBeTruthy();
  });

  test.each(notes)("renders notes", async (note) => {
    fetchNotesSpy.mockResolvedValueOnce([note]);
    renderNavigator(<HomeScreen />);
    const title = await screen.findByText(note.title);
    expect(title).toBeTruthy();
  });

  test("renders empty state", async () => {
    fetchNotesSpy.mockResolvedValueOnce([]);
    renderNavigator(<HomeScreen />);
    const emptyState = await screen.findByText("No notes found!");
    expect(emptyState).toBeTruthy();
  });

  test("renders error state", async () => {
    fetchNotesSpy.mockRejectedValueOnce(new Error("Something went wrong"));
    renderNavigator(<HomeScreen />);
    const emptyState = await screen.findByText("Something went wrong 😢");
    expect(emptyState).toBeTruthy();
  });

  test("opens note form modal", async () => {
    fetchNotesSpy.mockResolvedValueOnce([]);
    renderNavigator(<HomeScreen />);
    const addButton = await screen.findByTestId("add-note-button");
    fireEvent.press(addButton);
    expect(screen.getByText("Add a new note")).toBeOnTheScreen();
  });
});
