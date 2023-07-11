import Button from "components/Button";
import { FC } from "react";
import { Grade } from "types/grade.types";

export const CourseInfo: FC<{ grade: Grade }> = async ({ grade }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">
          {grade?.cis_info.name} {grade?.cis_info.type}
        </h1>
        <span className="text-sm">{grade?.moodle_info.fullname}</span>
      </div>

      <a
        href={`${process.env.NEXT_PUBLIC_MOODLE_URL}course/view.php?id=${grade?.moodle_info.id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button>Open in Moodle</Button>
      </a>
    </div>
  );
};
