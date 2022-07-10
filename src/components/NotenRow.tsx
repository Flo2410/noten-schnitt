import { UserContext } from "context/UserContext";
import React, { useContext, useEffect, useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import { Note } from "types/noten.types";
import { UserPayloadType } from "types/user.types";

const NotenRow = ({ note, onClick }: { note: Note; onClick?: () => void }) => {
  const {
    state: { noten },
    dispatch,
  } = useContext(UserContext);
  // const [checked, setChecked] = useState(!note.perm_exlude);

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
      <td>
        <div className="flex justify-center">
          <label className={`swap swap-rotate ${note.perm_exlude ? "cursor-not-allowed" : ""}`}>
            <input
              type="checkbox"
              onChange={(e) => {
                if (!noten) return;

                // setChecked(!checked);

                //FIXME: Find out why the animation won't work with the dispatch
                dispatch({
                  type: UserPayloadType.UPDATE_NOTE,
                  payload: { internal_id: note.internal_id, exlude: !note.exlude },
                });
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
      <td>{note.semester}</td>
    </tr>
  );
};

export default NotenRow;
