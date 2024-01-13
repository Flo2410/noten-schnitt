"use client";
import { Card } from "components/Card";
import { useEffect, useState } from "react";
import { useGradeStore } from "stores/gradeStore";

export const AverageGrade = () => {
  const [avg, setAvg] = useState(0);
  const [ects, setEcts] = useState(0);

  const { grades } = useGradeStore((state) => ({
    grades: state.grades,
  }));

  useEffect(() => {
    let sum_noten = 0;
    let sum_ects = 0;
    grades?.forEach((grade) => {
      if (grade.options.exlude || grade.options.perm_exlude) return;
      if (!grade.grade_info?.ects) return;

      sum_noten += +grade.cis_info.grade * +grade.grade_info.ects;
      sum_ects += +(grade.grade_info?.ects ?? 0);
    });

    setEcts(sum_ects);
    setAvg(sum_noten / sum_ects);
  }, [grades]);

  return (
    <Card>
      <div className="flex w-full flex-col items-center justify-around text-3xl sm:flex-row sm:items-start pwa:w-full">
        <span>Avg: {avg.toFixed(2)}</span>
        <span>ETCS: {ects}</span>
      </div>
    </Card>
  );
};
