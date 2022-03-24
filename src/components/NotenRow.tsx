import React from "react";
import { Note } from "types/noten.types";

const NotenRow = ({ note }: { note: Note }) => {
  return (
    <tr
      className={`${
        note.perm_exlude
          ? "bg-red-700 bg-opacity-30"
          : "" /*odd:bg-opacity-10 bg-white even:bg-opacity-20*/
      } ${note.exlude && !note.perm_exlude ? "bg-yellow-400 bg-opacity-30" : ""} `}
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
