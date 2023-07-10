"use client";
import NotenRow from "./NotenRow";
import { v4 as uuidv4 } from "uuid";
import { useGradeStore } from "stores/gradeStore";
import { Grade } from "types/grade.types";

const NotenListe = () => {
  const { grades, update_grade } = useGradeStore((state) => ({
    grades: state.grades,
    update_grade: state.update_grade,
  }));

  const show_excluded = true; // FIXME: make this an option

  const update_note = (grade: Grade) => {
    const index = grades.findIndex((val, i) => {
      return val.internal_id === grade.internal_id;
    });

    if (index < 0) return;

    const temp_grade = { ...grade };
    temp_grade.options.exlude = !grade.options.exlude;
    update_grade(temp_grade);

    console.log(temp_grade);
  };

  return (
    <div className="flex items-center justify-between p-2 overflow-x-auto bg-white rounded md:flex-row dark:bg-primary shadow-fhwn dark:shadow-fhwn-white">
      <table className="min-w-full text-center table-auto">
        <thead className="font-bold border-b-2 border-primary dark:border-white">
          <tr>
            <th className="px-2"></th>
            <th className="px-2">Note</th>
            <th className="px-2">Art</th>
            <th className="px-2">LV</th>
            <th className="px-2">ECTS</th>
            <th className="px-2">Prüfungsdatum</th>
            <th className="px-2">Semester</th>
          </tr>
        </thead>

        <tbody className="">
          {grades?.map((grade) => {
            if (!show_excluded && (grade.options.exlude || grade.options.perm_exlude)) return;
            return <NotenRow grade={grade} onClick={() => update_note(grade)} key={uuidv4()} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default NotenListe;
