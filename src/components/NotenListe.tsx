import React, { useContext } from "react";
import NotenRow from "./NotenRow";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "context/UserContext";

const NotenListe = ({ show_excluded }: { show_excluded: boolean }) => {
  const {
    state: { noten },
  } = useContext(UserContext);
  return (
    <div className="flex justify-center w-full">
      <div className="flex w-full px-4 py-2 my-4 overflow-x-auto dark:border shadow-fhwn md:w-2/3 2xl:w-1/2 md:mx-0 pwa:w-full">
        <table className="min-w-full text-center table-auto">
          <thead className="border-b-2 border-primary heading dark:border-white">
            <tr>
              <th className="px-2"></th>
              <th className="px-2">Note</th>
              <th className="px-2">Art</th>
              <th className="px-2">LV</th>
              <th className="px-2">ECTS</th>
              <th className="px-2">Prüfungsdatum</th>
              <th className="px-2">Semester</th>
              <th className="px-2">Quelle</th>
            </tr>
          </thead>

          <tbody>
            {noten?.map((note) => {
              if (!show_excluded && (note.exlude || note.perm_exlude)) return;
              return <NotenRow note={note} key={uuidv4()} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotenListe;
