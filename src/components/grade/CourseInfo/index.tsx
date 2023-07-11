"use client";

import Button from "components/Button";
import { FC } from "react";
import { useGradeStore } from "stores/gradeStore";

export const CourseInfo: FC<{ grade_id: string }> = ({ grade_id }) => {
  const get_grade_by_id = useGradeStore((state) => state.get_grade_by_id);
  const grade = get_grade_by_id(grade_id);

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">
          {grade?.cis_info.name} {grade?.cis_info.type}
        </h1>
        <span className="text-sm">{grade?.moodle_info.fullname}</span>
      </div>

      <a
        href={`${process.env.NEXT_PUBLIC_MOODLE_URL}/course/view.php?id=${grade?.moodle_info.id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button>Open in Moodle</Button>
      </a>
    </div>
  );
};
