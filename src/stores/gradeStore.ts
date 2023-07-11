"use client";
import { GradeStore } from "types/grade.types";
import { create } from "zustand";

export const useGradeStore = create<GradeStore>()((set, get) => ({
  grades: [],
  init: async (grades) => {
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
