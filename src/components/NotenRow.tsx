import React from "react";
import { Note } from "types/noten.types";

const NotenRow = ({ note }: { note: Note }) => {
  return (
    <>
      <div className={`col-span-1 ${note.exlude ? "bg-gray-900 bg-opacity-30" : ""}`}>
        {note.note}
      </div>
      <div className={`col-span-1 ${note.exlude ? "bg-gray-900 bg-opacity-30" : ""}`}>
        {note.art}
      </div>
      <div className={`col-span-6 ${note.exlude ? "bg-gray-900 bg-opacity-30" : ""}`}>
        {note.lv}
      </div>
      <div className={`col-span-1 ${note.exlude ? "bg-gray-900 bg-opacity-30" : ""}`}>
        {note.ects}
      </div>
      <div className={`col-span-2 ${note.exlude ? "bg-gray-900 bg-opacity-30" : ""}`}>
        {note.date}
      </div>
      <div className={`col-span-1 ${note.exlude ? "bg-gray-900 bg-opacity-30" : ""}`}>
        {note.semester}
      </div>
    </>
  );
};

export default NotenRow;
