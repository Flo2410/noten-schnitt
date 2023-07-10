"use client";
import React, { useState } from "react";
import NotenRow from "./NotenRow";
import { v4 as uuidv4 } from "uuid";
import { Note } from "types/noten.types";

const NotenListe = ({ noten, show_excluded }: { noten: Note[]; show_excluded: boolean }) => {
  const [noten_state, set_noten_state] = useState(noten);

  const update_note = (note: Note) => {
    const index = noten.findIndex((val, i) => {
      return val.internal_id === note.internal_id;
    });

    if (index < 0) return;

    const temp_noten = [...noten_state];
    note.exlude = !note.exlude;
    temp_noten[index] = note;
    set_noten_state(temp_noten);

    console.log(note);
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
          {noten_state?.map((note) => {
            if (!show_excluded && (note.exlude || note.perm_exlude)) return;
            return <NotenRow note={note} onClick={() => update_note(note)} key={uuidv4()} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default NotenListe;
