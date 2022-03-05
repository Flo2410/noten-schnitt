import React from "react";
import NotenRow from "./NotenRow";
import { v4 as uuidv4 } from "uuid";
import { Note } from "types/noten.types";

const NotenListe = ({ noten }: { noten: Array<Note> }) => {
  return (
    <div className="flex justify-center w-full">
      <div className="flex w-full px-4 py-2 mx-2 my-4 overflow-x-auto bg-blue-400 rounded-lg shadow-lg md:w-2/3 lg:w-1/2 md:mx-0 ">
        <table className="min-w-full text-center table-auto">
          <thead>
            <tr>
              <th className="px-2">Note</th>
              <th className="px-2">Art</th>
              <th className="px-2">LV</th>
              <th className="px-2">ECTS</th>
              <th className="px-2">Prüfungsdatum</th>
              <th className="px-2">Semester</th>
            </tr>
          </thead>

          <tbody className="">
            {noten.map((note) => (
              <NotenRow note={note} key={uuidv4()} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotenListe;
