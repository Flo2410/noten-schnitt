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
}

export interface Semester {
  semester: number;
  checked: boolean;
}
