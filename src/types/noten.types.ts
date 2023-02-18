import { User } from "./user-v2.types";
import { User as User_v1 } from "./user.types";

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
  init: (user_v1: User_v1, user_v2: User) => Promise<void>;
  update_note: (note: Partial<Note> & Pick<Note, "internal_id">) => void;
  clear: () => void;
}
