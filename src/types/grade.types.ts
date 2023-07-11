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
  ects?: string;
}

export interface Grade {
  internal_id: string;
  options: GradeOptions;
  cis_info: CISGradeInfo;
  moodle_info: MoodleGradeInfo;
}

export interface GradeStore {
  grades: Grade[];
  init: (grades: Grade[]) => Promise<void>;
  update_grade: (partial_grade: DeepPartial<Grade> & Pick<Grade, "internal_id">) => void;
  update: (grade: Grade[]) => void;
  clear: () => void;
}
