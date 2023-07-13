import { DeepPartial } from "./utility.types";

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
}

export interface GradeInfo {
  ects?: number;
}

export interface Grade {
  options: GradeOptions;
  cis_info: CISGradeInfo;
  moodle_info: MoodleGradeInfo;
  grade_info?: GradeInfo;
}

export interface GradeStore {
  grades: Grade[];
  init: (grades: Grade[]) => Promise<void>;
  update_grade: (id: number, partial_grade: DeepPartial<Grade>) => void;
  update: (grade: Grade[]) => void;
  get_grade_by_id: (id: number) => Grade | undefined;
  clear: () => void;
}
