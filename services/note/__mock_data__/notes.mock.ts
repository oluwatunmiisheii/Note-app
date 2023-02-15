// create a mock note
export const notes = [
  {
    id: "1",
    title: "Note title",
    text: "Note text two",
    date: new Date(),
    description: "Note description",
    note: "Note note",
  },
  {
    id: "2",
    title: "Note title two",
    text: "Note text two",
    date: new Date(),
    description: "Note description two",
    note: "Note note two",
  },
  {
    id: "3",
    title: "Note title three",
    text: "Note text three",
    date: new Date(),
    description: "Note description three",
    note: "Note note three",
  },
];

export const findNote = (id: string) => notes.find((note) => note.id === id);

export const getNote = () => notes[0];
