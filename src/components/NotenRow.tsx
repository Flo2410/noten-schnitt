import React from "react";
import { FiCheck, FiX } from "react-icons/fi";
import { useNotenStore } from "stores/notenStore";
import { Note } from "types/noten.types";

const NotenRow = ({ note }: { note: Note }) => {
  const update_note = useNotenStore((state) => state.update_note);

  const openModal = () => {
    if (note.source === "CIS") return;
  };

  return (
    <tr
      className={`dark:bg-opacity-50 cursor-pointer
      ${note.perm_exlude ? "bg-red-700/30 hover:bg-red-700/60" : ""} 
      ${
        note.exlude && !note.perm_exlude
          ? "bg-light/30 dark:bg-light/60 hover:bg-primary/30 dark:hover:bg-white/50"
          : ""
      } ${
        !note.exlude && !note.perm_exlude
          ? "hover:bg-primary/30 dark:hover:bg-white/50 even:bg-primary/5 dark:even:bg-white/10"
          : ""
      }`}
    >
      <td>
        <div className="flex justify-center">
          <label className={`swap swap-rotate ${note.perm_exlude ? "cursor-not-allowed" : ""}`}>
            <input
              type="checkbox"
              onChange={(e) => {
                if (!note) return;

                // setChecked(!checked);

                //FIXME: Find out why the animation won't work with the dispatch
                update_note({ internal_id: note.internal_id, exlude: !note.exlude });
              }}
              disabled={note.perm_exlude}
              checked={!note.perm_exlude && !note.exlude}
            />

            <FiCheck className="w-4 h-4 swap-on" />
            <FiX className="w-4 h-4 swap-off" />
          </label>
        </div>
      </td>
      <td onClick={() => openModal()}>{note.note}</td>
      <td onClick={() => openModal()}>{note.art}</td>
      <td onClick={() => openModal()}>{note.lv}</td>
      <td onClick={() => openModal()}>{note.ects}</td>
      <td onClick={() => openModal()}>{note.date}</td>
      <td onClick={() => openModal()}>{note.semester}</td>
      <td onClick={() => openModal()}>{note.source}</td>
    </tr>
  );
};

export default NotenRow;
