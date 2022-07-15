import React, { FC } from "react";
import { v4 as uuidv4 } from "uuid";
import { ModalContent } from "types/modal.types";
import TimeTableRow from "./TimeTableRow";

const TimeTable: FC<{ modal: ModalContent }> = ({ modal }) => {
  return (
    <div className="flex justify-center w-full mb-4">
      <div className="flex flex-col w-full px-4 py-2 overflow-x-auto dark:border shadow-fhwn">
        <h3 className="mb-2 text-xl heading">Termine</h3>

        <table className="min-w-full text-center table-auto">
          <thead className="border-b-2 border-primary heading dark:border-white">
            <tr>
              <th className="px-2">Datum</th>
              <th className="px-2">Tag</th>
              <th className="px-2">Von</th>
              <th className="px-2">Bis</th>
              <th className="px-2">ReferentIn</th>
              <th className="px-2">Raum</th>
              <th className="px-2">Fernlehre</th>
              <th className="px-2"></th>
            </tr>
          </thead>

          <tbody>
            {modal.content.timetable.map((timetable_entry) => (
              <TimeTableRow timetable_entry={timetable_entry} key={uuidv4()} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeTable;
