import React from "react";
import { Note } from "types/noten.types";

const NotenRow = ({ note }: { note: Note }) => {
  return (
    <tr
      className={`dark:bg-opacity-50 ${
        note.perm_exlude
          ? "bg-red-700 bg-opacity-30"
          : "" /*odd:bg-opacity-10 bg-white even:bg-opacity-20*/
      } ${note.exlude && !note.perm_exlude ? "bg-light bg-opacity-30" : ""} ${
        !note.exlude && !note.perm_exlude
          ? "even:bg-primary even:bg-opacity-5 dark:even:bg-white dark:even:bg-opacity-10"
          : ""
      }`}
    >
      <td>{note.note}</td>
      <td>{note.art}</td>
      <td>{note.lv}</td>
      <td>{note.ects}</td>
      <td>{note.date}</td>
      <td>{note.semester}</td>
    </tr>
  );
};

export default NotenRow;
