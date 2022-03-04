import React from "react";
import NotenRow from "./NotenRow";
import { v4 as uuidv4 } from "uuid";
import { Note } from "types/noten.types";

const NotenListe = ({ noten }: { noten: Array<Note> }) => {
  return (
    <div className="flex justify-center w-full ">
      <div className="grid w-full grid-cols-12 px-4 py-2 m-4 text-center bg-blue-400 rounded-lg shadow-lg md:w-1/2 md:mx-0 ">
        <div className="col-span-1">Note</div>
        <div className="col-span-1">Art</div>
        <div className="col-span-6">LV</div>
        <div className="col-span-1">ECTS</div>
        <div className="col-span-2">Prüfungsdatum</div>
        <div className="col-span-1">Semester</div>

        {noten.map((note) => (
          <NotenRow note={note} key={uuidv4()} />
        ))}
      </div>
    </div>
  );
};

export default NotenListe;
