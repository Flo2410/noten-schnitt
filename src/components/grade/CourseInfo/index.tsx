import { FC } from "react";
import { Grade } from "types/grade.types";
import { InfoTitle } from "./InfoTitle";

export const CourseInfo: FC<{ grade: Grade }> = async ({ grade }) => {
  return (
    <>
      <InfoTitle grade={grade} />

      <span>ECTS: {grade?.grade_info?.ects}</span>
    </>
  );
};
