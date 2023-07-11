"use client";

import { FC } from "react";
import { useGradeStore } from "stores/gradeStore";
import { Grade } from "types/grade.types";

export const GradeStoreInitiator: FC<{
  grades: Grade[];
}> = ({ grades }) => {
  const init = useGradeStore((state) => state.init);
  init(grades);

  return null;
};
