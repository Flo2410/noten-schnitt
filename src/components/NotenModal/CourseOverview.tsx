import React, { FC } from "react";
import { v4 as uuidv4 } from "uuid";
import { ModalContent } from "types/modal.types";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const CourseOverview: FC<{ modal: ModalContent }> = ({ modal }) => {
  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col w-full px-4 py-2 dark:border shadow-fhwn">
        <h3 className="pb-2 mb-4 text-xl border-b-2 heading border-primary dark:border-white">
          Lehrveranstaltungsbeschreibung
        </h3>

        {modal.content.course_overview.length > 0 && (
          <div className="flex flex-col gap-y-2">
            {modal.content.course_overview.map((course_overview_entry) => (
              <div key={uuidv4()} className="flex flex-wrap gap-x-2">
                <h4 className="heading">{course_overview_entry.key}:</h4>
                <p className="paragraph">
                  {course_overview_entry.value !== "" ? course_overview_entry.value : "-"}
                </p>
              </div>
            ))}
          </div>
        )}

        {modal.content.course_overview.length <= 0 && modal.content.timetable.length > 0 && (
          <p className="paragraph">
            Derzeit keine freigegebene Lehrveranstaltungsbeschreibung für
            <span className="italic"> {modal.content.fullname}</span> vorhanden!
          </p>
        )}

        {modal.content.timetable.length <= 0 && modal.content.timetable.length <= 0 && (
          <SkeletonTheme baseColor="#344981" highlightColor="#969FBB">
            <Skeleton count={5} />
          </SkeletonTheme>
        )}
      </div>
    </div>
  );
};

export default CourseOverview;
