export interface GradeOptions {
  exlude: boolean;
  perm_exlude: boolean;
}

export interface CISGradeInfo {
  name: string;
  date: string;
  grade: string;
  type: string;
  semester: string;
}

export interface MoodleGradeInfo {
  shortname: string;
  fullname: string;
  displayname: string;
  id: number;
  ects?: string;
}

export interface Grade {
  internal_id: string;
  options: GradeOptions;
  cis_info: CISGradeInfo;
  moodle_info: MoodleGradeInfo;
}

export interface Semester {
  semester: number;
  checked: boolean;
}

export interface GradeStore {
  grades: Grade[];
  init: (cis_infos: CISGradeInfo[], moodle_infos: MoodleGradeInfo[]) => Promise<void>;
  update_grade: (grade: Partial<Grade> & Pick<Grade, "internal_id">) => void;
  update: (grade: Grade[]) => void;
  clear: () => void;
}
