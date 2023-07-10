"use client";
import clsx from "clsx";
import React, { FC } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import { Grade } from "types/grade.types";

const NotenRow: FC<{ grade: Grade; onClick?: () => void }> = ({ grade, onClick }) => {
  return (
    <tr
      className={clsx(
        "cursor-pointer group",
        grade.options.perm_exlude && "bg-red-700/30 hover:bg-red-700/60",
        grade.options.exlude &&
          !grade.options.perm_exlude &&
          "bg-light/30 dark:bg-light/60 hover:bg-primary/30 dark:hover:bg-white/50",
        !grade.options.exlude &&
          !grade.options.perm_exlude &&
          "hover:bg-primary/20 dark:hover:bg-white/50 even:bg-primary/5 dark:even:bg-white/10"
      )}
      onClick={onClick}
    >
      <td className="group-last:rounded-bl">
        <div className="flex justify-center">
          <label
            className={`swap swap-rotate ${grade.options.perm_exlude ? "cursor-not-allowed" : ""}`}
          >
            <input
              type="checkbox"
              onChange={(e) => {
                if (!grade) return;

                // setChecked(!checked);

                //FIXME: Find out why the animation won't work with the dispatch
                // update_grade({ internal_id: grade.internal_id, exlude: !grade.exlude });
              }}
              disabled={grade.options.perm_exlude}
              checked={!grade.options.perm_exlude && !grade.options.exlude}
            />

            <FiCheck className="w-4 h-4 swap-on" />
            <FiX className="w-4 h-4 swap-off" />
          </label>
        </div>
      </td>
      <td>{grade.cis_info.grade}</td>
      <td>{grade.cis_info.type}</td>
      <td>{grade.cis_info.name}</td>
      <td>{grade.moodle_info.ects}</td>
      <td>{grade.cis_info.date}</td>
      <td className="group-last:rounded-br">{grade.cis_info.semester}</td>
    </tr>
  );
};

export default NotenRow;
