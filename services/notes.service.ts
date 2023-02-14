import { Note, CreateNoteDto, NoteResponse } from "../models/note.model";
import http from "../plugins/http.client";

class NotesService {
  public async fetchNotes(): Promise<Note[]> {
    const response: NoteResponse = await http.get("/notes.json");

    const notes: Note[] = [];

    for (const key in response) {
      const noteObj: Note = {
        ...response[key as keyof Note],
        id: key,
        date: new Date(response[key as keyof Note].date),
      };
      notes.push(noteObj);
    }

    return notes.reverse();
  }

  public async fetchNoteById(id: string): Promise<Note> {
    const note: Note = await http.get(`/notes/${id}.json?print=pretty`);
    const noteObj = {
      ...note,
      date: new Date(note.date),
      id,
    };
    return noteObj;
  }

  public async createNote(note: CreateNoteDto): Promise<{ name: string }> {
    return http.post("/notes.json", note);
  }

  public async updateNoteById(
    id: string,
    note: CreateNoteDto
  ): Promise<CreateNoteDto> {
    return http.put(`/notes/${id}.json`, note);
  }

  public async deleteNoteById(id: string): Promise<Note> {
    return http.delete(`/notes/${id}.json`);
  }
}

export default new NotesService();
