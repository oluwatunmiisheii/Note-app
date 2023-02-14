export interface CreateNoteDto {
  title: string;
  date: Date;
  description: string;
  note: string;
}

export interface NoteResponse {
  [key: string]: Note;
}

export interface Note extends CreateNoteDto {
  id: string;
}
