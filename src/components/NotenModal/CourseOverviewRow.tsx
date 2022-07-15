import React, { FC } from "react";
import { CourseOverviewEntry } from "types/course.types";

const CourseOverviewRow: FC<{ course_overview_entry: CourseOverviewEntry }> = ({
  course_overview_entry,
}) => {
  return (
    <tr className="cursor-pointer dark:bg-opacity-50 even:bg-primary/5 dark:even:bg-white/10">
      <td className="px-4 py-1 border-r-2 whitespace-nowrap border-primary dark:border-white">
        {course_overview_entry.key}
      </td>
      <td className="px-4">{course_overview_entry.value}</td>
    </tr>
  );
};

export default CourseOverviewRow;
