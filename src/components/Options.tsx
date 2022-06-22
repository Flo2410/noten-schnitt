import { UserContext } from "context/UserContext";
import React, { useContext, useEffect, useState } from "react";
import { Semester } from "types/noten.types";
import { UserPayloadType } from "types/user.types";
import { v4 as uuidv4 } from "uuid";

const Options = ({
  show_excluded,
  setShowExcluded,
}: {
  show_excluded: boolean;
  setShowExcluded: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [semesters, setSemesters] = useState<Array<Semester>>([]);
  const [hasInit, setHasInit] = useState(false);
  const { state: user, dispatch: dispatchUser } = useContext(UserContext);

  useEffect(() => {
    if (!hasInit && user.noten && user.noten?.length > 0) {
      const temp: Array<number> = [];

      user.noten.forEach((note) => {
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
  }, [user.noten]);

  useEffect(() => {
    if (!user.noten) return;

    const temp = [...user.noten];
    temp.forEach((note) => {
      semesters.forEach((sem) => {
        if (Number(note.semester) === sem.semester) {
          note.exlude = !sem.checked;
        }
      });
    });

    dispatchUser({
      type: UserPayloadType.UPDATE,
      payload: { noten: temp },
    });
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
      <div className="w-full px-4 py-2 text-4xl rounded-lg shadow-lg md:w-2/3 xl:w-1/2 pwa:w-full">
        <form className="flex flex-col justify-between gap-2 text-lg sm:flex-row">
          <div className="flex flex-wrap gap-4">
            {semesters.map((semester) => (
              <div key={uuidv4()} className="shrink-0">
                <span className="mr-2">Semester {semester.semester}</span>
                <input
                  className="w-3 h-3 rounded-sm appearance-none ring-offset-2 ring-light checked:bg-primary ring-1"
                  type="checkbox"
                  value={semester.semester}
                  checked={semester.checked}
                  onChange={(v) => {
                    inputChange(semester.semester, v.target.checked);
                  }}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-8 md:gap-2 md:flex-col sm:flex-row">
            <div className="">
              <span className="mr-2">Show excluded</span>
              <input
                className="w-3 h-3 rounded-sm appearance-none ring-offset-2 ring-gray-600 checked:bg-primary ring-1"
                type="checkbox"
                checked={show_excluded}
                onChange={(v) => {
                  setShowExcluded(!show_excluded);
                }}
              />
            </div>

            <button
              type="reset"
              onClick={() => reset()}
              className="flex items-center h-8 px-4 text-center text-white border-2 rounded-md shadow-fhwn bg-primary hover:bg-white hover:text-primary border-primary"
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
