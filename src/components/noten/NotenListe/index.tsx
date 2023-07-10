import React from "react";
import NotenRow from "./NotenRow";
import { v4 as uuidv4 } from "uuid";
import { Note } from "types/noten.types";

const NotenListe = ({ noten, show_excluded }: { noten: Note[]; show_excluded: boolean }) => {
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
          {noten?.map((note) => {
            if (!show_excluded && (note.exlude || note.perm_exlude)) return;
            return <NotenRow note={note} key={uuidv4()} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default NotenListe;
