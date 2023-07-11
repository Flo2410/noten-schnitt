"use client";
import { GradeStore } from "types/grade.types";
import { create } from "zustand";
import merge from "lodash.merge";

export const useGradeStore = create<GradeStore>()((set, get) => ({
  grades: [],
  init: async (grades) => {
    set({ grades });
  },
  update_grade: (partial_grade) => {
    const grade = get().grades.find((item) => item.internal_id === partial_grade.internal_id);
    if (!grade) return;

    const updated_grade = merge({}, grade, partial_grade);

    const updated_grades = get().grades.map((grade) =>
      grade.internal_id === updated_grade.internal_id ? updated_grade : grade
    );

    set({ grades: updated_grades });
  },
  update: (grades) => {
    set({ grades });
  },
  get_grade_by_id: (id) => {
    return get().grades.find((grade) => grade.internal_id === id);
  },
  clear: () => set({ grades: [] }),
}));
