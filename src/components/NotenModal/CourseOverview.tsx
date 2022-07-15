import React, { FC } from "react";
import { v4 as uuidv4 } from "uuid";
import { ModalContent } from "types/modal.types";
import CourseOverviewRow from "./CourseOverviewRow";

const CourseOverview: FC<{ modal: ModalContent }> = ({ modal }) => {
  return (
    <div className="flex justify-center w-full mb-4">
      <div className="flex flex-col w-full px-4 py-2 overflow-x-auto dark:border shadow-fhwn">
        <h3 className="mb-2 text-xl heading">Lehrveranstaltungsbeschreibung</h3>

        {modal.content.course_overview.length > 0 && (
          <table className="min-w-full table-auto">
            <tbody>
              {modal.content.course_overview.map((course_overview_entry) => (
                <CourseOverviewRow course_overview_entry={course_overview_entry} key={uuidv4()} />
              ))}
            </tbody>
          </table>
        )}

        {modal.content.course_overview.length <= 0 && modal.content.timetable.length > 0 && (
          <p className="paragraph">
            Derzeit keine freigegebene Lehrveranstaltungsbeschreibung für
            <span className="italic"> {modal.content.fullname}</span> vorhanden!
          </p>
        )}
      </div>
    </div>
  );
};

export default CourseOverview;
