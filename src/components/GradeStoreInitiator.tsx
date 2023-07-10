"use client";

import { FC } from "react";
import { useGradeStore } from "stores/gradeStore";
import { CISGradeInfo, MoodleGradeInfo } from "types/grade.types";

export const GradeStoreInitiator: FC<{
  cis_infos: CISGradeInfo[] | null;
  moodle_infos: MoodleGradeInfo[] | null;
}> = ({ cis_infos, moodle_infos }) => {
  const init = useGradeStore((state) => state.init);
  if (cis_infos) init(cis_infos, moodle_infos);

  return null;
};
