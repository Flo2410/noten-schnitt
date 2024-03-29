"use client";
import merge from "lodash.merge";
import { GradeStore } from "types/grade.types";
import { create } from "zustand";

export const useGradeStore = create<GradeStore>()((set, get) => ({
  grades: [],
  init: async (grades) => {
    set({ grades });
  },
  update_grade: (id, partial_grade) => {
    const grade = get().grades.find((item) => item.moodle_info.id === id);
    if (!grade) return;

    const updated_grade = merge({}, grade, partial_grade);

    const updated_grades = get().grades.map((grade) =>
      grade.moodle_info.id === id ? updated_grade : grade
    );

    set({ grades: updated_grades });
  },
  update: (grades) => {
    set({ grades });
  },
  get_grade_by_id: (id) => {
    return get().grades.find((grade) => grade.moodle_info.id === id);
  },
  clear: () => set({ grades: [] }),
}));
