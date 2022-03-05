import React, { useEffect, useState } from "react";
import { Note } from "types/noten.types";

const NotenSchnitt = ({ noten }: { noten: Array<Note> }) => {
  const [schnitt, setSchnitt] = useState(0);

  useEffect(() => {
    let sum_noten = 0;
    let sum_ects = 0;
    noten.forEach((note) => {
      if (note.exlude) return;

      sum_noten += +note.note * +note.ects;
      sum_ects += +note.ects;
    });

    setSchnitt(sum_noten / sum_ects);
  }, [noten]);

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col w-full px-4 py-2 mx-2 mt-2 text-5xl bg-green-400 rounded-lg shadow-lg md:mt-4 sm:flex-row md:w-1/2 md:mx-0">
        <span className="text-center">Notenschnitt: </span>
        <div className="flex justify-center w-full">
          <span>{schnitt.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default NotenSchnitt;
