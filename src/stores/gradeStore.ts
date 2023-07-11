"use client";
import { Grade, GradeStore } from "types/grade.types";
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

export const useGradeStore = create<GradeStore>()((set, get) => ({
  grades: [],
  init: async (cis_infos, moodle_infos) => {
    // CIS Infos are the primary source
    const grades: Grade[] = cis_infos.map((cis_info) => {
      // Find the corresponding moodle info
      const moodle_info = moodle_infos?.find((info) => info.fullname.includes(cis_info.name))!;

      return {
        internal_id: uuidv4(),
        cis_info: cis_info,
        moodle_info: moodle_info,
        options: {
          exlude: false,
          perm_exlude: cis_info.grade.match(/[1-4]/g) ? false : true,
        },
      };
    });

    grades.sort(
      (a, b) =>
        moment(b.cis_info.date, "DD.MM.YYYY").unix() - moment(a.cis_info.date, "DD.MM.YYYY").unix()
    );

    set({ grades });
  },
  update_grade: (grade) => {
    const unmodified_grade = get().grades.find((item) => item.internal_id === grade.internal_id);
    if (!unmodified_grade) return;

    const updated_grade = { ...unmodified_grade, ...grade };

    const updated_grades = get().grades.map((grade) =>
      grade.internal_id === updated_grade.internal_id ? updated_grade : grade
    );

    set({ grades: updated_grades });
  },
  update: (grades) => {
    set({ grades });
  },
  clear: () => set({ grades: [] }),
}));
