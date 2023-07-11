"use client";
import { v4 as uuidv4 } from "uuid";
import { useGradeStore } from "stores/gradeStore";
import { useRouter } from "next/navigation";
import GradeRow from "./GradeRow";
import { Card } from "components/Card";

export const GradeList = () => {
  const { grades } = useGradeStore((state) => ({
    grades: state.grades,
  }));

  const router = useRouter();

  const show_excluded = true; // FIXME: make this an option

  return (
    <Card>
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
            return (
              <GradeRow
                grade={grade}
                key={uuidv4()}
                onClick={() => router.push(`/grade/${grade.moodle_info.id}`)}
              />
            );
          })}
        </tbody>
      </table>
    </Card>
  );
};
