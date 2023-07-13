"use client";
import clsx from "clsx";
import { FC } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import { useGradeStore } from "stores/gradeStore";
import { Grade } from "types/grade.types";

const GradeRow: FC<{ grade: Grade; onClick?: () => void }> = ({ grade, onClick }) => {
  const update_grade = useGradeStore((state) => state.update_grade);

  return (
    <tr
      className={clsx(
        "group cursor-pointer",
        grade.options.perm_exlude && "bg-red-700/30 hover:bg-red-700/60",
        grade.options.exlude &&
          !grade.options.perm_exlude &&
          "bg-light/30 hover:bg-primary/30 dark:bg-light/60 dark:hover:bg-white/50",
        !grade.options.exlude &&
          !grade.options.perm_exlude &&
          "even:bg-primary/5 hover:bg-primary/20 dark:even:bg-white/10 dark:hover:bg-white/50"
      )}
    >
      <td className="px-2 py-2 group-last:rounded-bl">
        <div className="flex justify-center">
          <label
            className={`swap swap-rotate ${
              grade.options.perm_exlude ? "cursor-not-allowed" : ""
            }`}
          >
            <input
              type="checkbox"
              onChange={(e) => {
                if (!grade) return;

                update_grade(grade.moodle_info.id, {
                  options: { exlude: !grade.options.exlude },
                });
              }}
              disabled={grade.options.perm_exlude}
              checked={!grade.options.perm_exlude && !grade.options.exlude}
            />

            <FiCheck className="swap-on h-4 w-4" />
            <FiX className="swap-off h-4 w-4" />
          </label>
        </div>
      </td>
      <td onClick={onClick}>{grade.cis_info.grade}</td>
      <td onClick={onClick}>{grade.cis_info.type}</td>
      <td onClick={onClick}>{grade.cis_info.name}</td>
      <td onClick={onClick}>{grade.grade_info?.ects}</td>
      <td onClick={onClick}>{grade.cis_info.date}</td>
      <td onClick={onClick} className="group-last:rounded-br">
        {grade.cis_info.semester}
      </td>
    </tr>
  );
};

export default GradeRow;
