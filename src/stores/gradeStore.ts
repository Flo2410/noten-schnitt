"use client";
import { Grade, GradeStore, MoodleGradeInfo } from "types/grade.types";
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { closest } from "fastest-levenshtein";

export const useGradeStore = create<GradeStore>()((set, get) => ({
  grades: [],
  init: async (cis_infos, moodle_infos) => {
    // CIS Infos are the primary source
    const grades: Grade[] = cis_infos.map((cis_info) => {
      // Find the corresponding moodle info
      let moodle_info: MoodleGradeInfo | undefined = {
        displayname: "",
        fullname: "",
        id: 0,
        shortname: "",
      };

      const moodle_info_matches = moodle_infos?.filter((info) =>
        info.fullname.includes(cis_info.name)
      );

      let moodle_closest = "";

      if (moodle_info_matches?.length === 1) {
        // one match
        moodle_info = moodle_info_matches[0];
      } else if (moodle_info_matches?.length > 1) {
        // more then one match
        moodle_closest = closest(cis_info.name, moodle_info_matches?.map((info) => info.fullname)!);
        moodle_info = moodle_info_matches?.find((info) => info.fullname === moodle_closest);
      } else {
        // no match
        moodle_closest = closest(cis_info.name, moodle_infos?.map((info) => info.fullname)!);
        moodle_info = moodle_infos?.find((info) => info.fullname === moodle_closest);
      }

      const grade: Grade = {
        internal_id: uuidv4(),
        cis_info: cis_info,
        moodle_info: moodle_info!,
        options: {
          exlude: false,
          perm_exlude: cis_info.grade.match(/[1-4]/g) ? false : true,
        },
      };

      if (!moodle_info) {
        console.log("grade:", grade);
        console.log("matches:", moodle_info_matches);
        console.log("closest:", moodle_closest);
        console.log("info:", moodle_info);
      }

      return grade;
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
