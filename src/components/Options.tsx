import React, { useEffect, useState } from "react";
import { Note, Semester } from "types/noten.types";
import { v4 as uuidv4 } from "uuid";

const Options = ({
  noten,
  setNoten,
  show_excluded,
  setShowExcluded,
}: {
  noten: Array<Note>;
  setNoten: React.Dispatch<React.SetStateAction<Note[]>>;
  show_excluded: boolean;
  setShowExcluded: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [semesters, setSemesters] = useState<Array<Semester>>([]);
  const [hasInit, setHasInit] = useState(false);

  useEffect(() => {
    if (!hasInit && noten.length > 0) {
      const temp: Array<number> = [];

      noten.forEach((note) => {
        const note_number = Number(note.semester);
        if (!temp.includes(note_number)) temp.push(note_number);
      });

      temp.sort((a, b) => {
        return a - b;
      });

      const new_semester: Array<Semester> = [];
      temp.forEach((t) => new_semester.push({ semester: t, checked: true }));
      setSemesters(new_semester);
      setHasInit(true);
    }
  }, [noten]);

  useEffect(() => {
    const temp = [...noten];
    temp.forEach((note) => {
      semesters.forEach((sem) => {
        if (Number(note.semester) === sem.semester) {
          note.exlude = !sem.checked;
        }
      });
    });
    setNoten(temp);
  }, [semesters]);

  const inputChange = (semester: number, checked: boolean): void => {
    const temp = [...semesters];
    temp.forEach((sem) => {
      if (sem.semester === semester) sem.checked = checked;
    });
    setSemesters(temp);
  };

  const reset = () => {
    const temp = [...semesters];
    temp.forEach((t) => (t.checked = true));
    setSemesters(temp);
    setShowExcluded(true);
  };

  return (
    <div className="flex justify-center w-full mt-4">
      <div className="w-full px-4 py-2 text-4xl bg-yellow-400 rounded-lg shadow-lg md:w-2/3 xl:w-1/2 pwa:w-full">
        <form className="flex justify-between text-lg">
          <div className="flex flex-col gap-4 sm:flex-row">
            {semesters.map((semester) => (
              <label key={uuidv4()}>
                <span className="mr-2">Semester {semester.semester}</span>
                <input
                  className="w-3 h-3 rounded-sm appearance-none ring-offset-2 ring-gray-600 ring-offset-yellow-400 checked:bg-blue-500 ring-1"
                  type="checkbox"
                  value={semester.semester}
                  checked={semester.checked}
                  onChange={(v) => {
                    inputChange(semester.semester, v.target.checked);
                  }}
                />
              </label>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-8">
            <label>
              <span className="mr-2">Show excluded</span>
              <input
                className="w-3 h-3 rounded-sm appearance-none ring-offset-2 ring-gray-600 ring-offset-yellow-400 checked:bg-blue-500 ring-1"
                type="checkbox"
                checked={show_excluded}
                onChange={(v) => {
                  setShowExcluded(!show_excluded);
                }}
              />
            </label>

            <button
              type="reset"
              onClick={() => reset()}
              className="flex items-center h-6 px-2 text-center rounded-sm hover:bg-blue-500 ring-offset-2 ring-gray-600 ring-offset-yellow-400 ring-1"
            >
              <span>Reset</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Options;
