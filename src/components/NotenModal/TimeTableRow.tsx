import React, { FC } from "react";
import { CourseTimetableEntry } from "types/course.types";

const TimeTableRow: FC<{ timetable_entry: CourseTimetableEntry }> = ({ timetable_entry }) => {
  return (
    <tr className="cursor-pointer dark:bg-opacity-50 hover:bg-primary/30 dark:hover:bg-white/50 even:bg-primary/5 dark:even:bg-white/10">
      <td className="pl-2">{timetable_entry.date}</td>
      <td>{timetable_entry.day}</td>
      <td>{timetable_entry.start_time}</td>
      <td>{timetable_entry.end_time}</td>
      <td>{timetable_entry.lecturer}</td>
      <td>{timetable_entry.room}</td>
      <td>{timetable_entry.distance_learning}</td>
      <td className="pr-2">{timetable_entry.exam}</td>
    </tr>
  );
};

export default TimeTableRow;
