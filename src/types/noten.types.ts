import { User } from "./user.types";

export interface Note {
  internal_id: string;
  note: string;
  art: string;
  lv: string;
  ects: string;
  date: string;
  semester: string;
  exlude: boolean;
  perm_exlude: boolean;
  source: string;
}

export interface Semester {
  semester: number;
  checked: boolean;
}

export interface NotenStore {
  noten: Note[];
  init: (user: User) => Promise<void>;
  update_note: (note: Partial<Note> & Pick<Note, "internal_id">) => void;
  update: (noten: Note[]) => void;
  clear: () => void;
}
