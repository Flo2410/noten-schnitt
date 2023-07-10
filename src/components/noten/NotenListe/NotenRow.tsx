"use client";
import clsx from "clsx";
import React from "react";
import { FiCheck, FiX } from "react-icons/fi";
import { Note } from "types/noten.types";

const NotenRow = ({ note }: { note: Note }) => {
  return (
    <tr
      className={clsx(
        "cursor-pointer group",
        note.perm_exlude && "bg-red-700/30 hover:bg-red-700/60",
        note.exlude &&
          !note.perm_exlude &&
          "bg-light/30 dark:bg-light/60 hover:bg-primary/30 dark:hover:bg-white/50",
        !note.exlude &&
          !note.perm_exlude &&
          "hover:bg-primary/20 dark:hover:bg-white/50 even:bg-primary/5 dark:even:bg-white/10"
      )}
      onClick={() => console.log(note)}
    >
      <td className="group-last:rounded-bl">
        <div className="flex justify-center">
          <label className={`swap swap-rotate ${note.perm_exlude ? "cursor-not-allowed" : ""}`}>
            <input
              type="checkbox"
              onChange={(e) => {
                if (!note) return;

                // setChecked(!checked);

                //FIXME: Find out why the animation won't work with the dispatch
                // update_note({ internal_id: note.internal_id, exlude: !note.exlude });
              }}
              disabled={note.perm_exlude}
              checked={!note.perm_exlude && !note.exlude}
            />

            <FiCheck className="w-4 h-4 swap-on" />
            <FiX className="w-4 h-4 swap-off" />
          </label>
        </div>
      </td>
      <td>{note.note}</td>
      <td>{note.art}</td>
      <td>{note.lv}</td>
      <td>{note.ects}</td>
      <td>{note.date}</td>
      <td className="group-last:rounded-br">{note.semester}</td>
    </tr>
  );
};

export default NotenRow;
