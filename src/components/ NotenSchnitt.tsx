import React, { useEffect, useState } from "react";
import { Note } from "types/noten.types";

const NotenSchnitt = ({ noten }: { noten: Array<Note> }) => {
  const [schnitt, setSchnitt] = useState(0);
  const [ects, setEcts] = useState(0);

  useEffect(() => {
    let sum_noten = 0;
    let sum_ects = 0;
    noten.forEach((note) => {
      if (note.exlude || note.perm_exlude) return;

      sum_noten += +note.note * +note.ects;
      sum_ects += +note.ects;
    });

    setEcts(sum_ects);
    setSchnitt(sum_noten / sum_ects);
  }, [noten]);

  return (
    <div className="flex justify-center w-full mt-4">
      <div className="grid w-full grid-cols-1 px-4 py-2 text-4xl bg-green-400 rounded-lg shadow-lg xl:w-1/2 md:grid-cols-2 sm:flex-row md:w-2/3 pwa:w-full">
        <span className="text-center">Notenschnitt: </span>
        <div className="flex justify-center w-full">
          <span>{schnitt.toFixed(2)}</span>
        </div>

        <span className="text-center">ECTS ges.: </span>
        <div className="flex justify-center w-full">
          <span>{ects}</span>
        </div>
      </div>
    </div>
  );
};

export default NotenSchnitt;
