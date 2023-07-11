"use client";
import { Card } from "components/Card";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { useGradeStore } from "stores/gradeStore";
import GradeRow from "./GradeRow";

export const GradeList = () => {
  const { grades } = useGradeStore((state) => ({
    grades: state.grades,
  }));

  const router = useRouter();

  const show_excluded = true; // FIXME: make this an option

  return (
    <Card>
      <table className="min-w-full table-auto text-center">
        <thead className="border-b-2 border-primary font-bold dark:border-white">
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

        <tbody>
          {grades?.map((grade) => {
            if (!show_excluded && (grade.options.exlude || grade.options.perm_exlude))
              return;
            return (
              <GradeRow
                grade={grade}
                key={nanoid()}
                onClick={() => router.push(`/grade/${grade.moodle_info.id}`)}
              />
            );
          })}
        </tbody>
      </table>
    </Card>
  );
};
