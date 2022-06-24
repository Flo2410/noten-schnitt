import { UserContext } from "context/UserContext";
import React, { useContext, useEffect, useState } from "react";
import { Semester } from "types/noten.types";
import { UserPayloadType } from "types/user.types";
import { v4 as uuidv4 } from "uuid";
import CheckBox from "./CheckBox";

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
      <div className="w-full px-4 py-2 text-4xl shadow-fhwn md:w-2/3 2xl:w-1/2 pwa:w-full">
        <form className="flex flex-col justify-between gap-2 text-lg sm:flex-row">
          <div className="flex flex-wrap gap-4 justify-evenly">
            {semesters.map((semester) => (
              <CheckBox
                key={uuidv4()}
                className="shrink-0"
                label={`Semester ${semester.semester}`}
                checked={semester.checked}
                onChange={(checked) => inputChange(semester.semester, checked)}
              />
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <CheckBox
              label="Show exluded"
              onChange={() => setShowExcluded(!show_excluded)}
              checked={show_excluded}
            />

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
