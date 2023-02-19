import React from "react";

export const MissingECTS = () => {
  return (
    <div className="flex justify-center w-full mt-4">
      <div className="grid w-full grid-cols-1 px-4 py-2 shadow-fhwn 2xl:w-1/2 md:grid-cols-2 sm:flex-row md:w-2/3 pwa:w-full dark:border">
        <span className="text-2xl font-bold text-center text-red-500">HINWEIS! </span>
        <p className="text-lg text-center">
          Im Notenschnitt werden keine Noten einberrechnet, welche aus dem CIS geladen wurden.
          Leider werden im CIS keine ECTS angegeben.
        </p>
      </div>
    </div>
  );
};
