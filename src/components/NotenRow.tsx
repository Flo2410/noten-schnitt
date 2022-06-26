import React from "react";
import { Note } from "types/noten.types";

const NotenRow = ({ note, onClick }: { note: Note; onClick?: () => void }) => {
  return (
    <tr
      className={`dark:bg-opacity-50 cursor-pointer
      ${note.perm_exlude ? "bg-red-700/30 cursor-not-allowed" : ""} 
      ${
        note.exlude && !note.perm_exlude
          ? "bg-light/30 dark:bg-light/60 hover:bg-primary/30 dark:hover:bg-white/50"
          : ""
      } ${
        !note.exlude && !note.perm_exlude
          ? "hover:bg-primary/30 dark:hover:bg-white/50 even:bg-primary/5 dark:even:bg-white/10"
          : ""
      }`}
      onClick={() => (onClick ? onClick() : null)}
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
