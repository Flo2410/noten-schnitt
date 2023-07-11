import "server-only";

import moment from "moment";
import { CISGradeInfo, Grade, MoodleGradeInfo } from "types/grade.types";
import { v4 as uuidv4 } from "uuid";
import { closest } from "fastest-levenshtein";

export const make_grades = async (
  cis_infos: CISGradeInfo[],
  moodle_infos: MoodleGradeInfo[]
): Promise<Grade[]> => {
  // CIS Infos are the primary source
  const grades: Grade[] = cis_infos.map((cis_info) => {
    // Find the corresponding moodle info
    let moodle_info: MoodleGradeInfo | undefined = {
      displayname: "",
      fullname: "",
      id: 0,
      shortname: "",
    };

    const moodle_info_matches = moodle_infos?.filter((info) =>
      info.fullname.includes(cis_info.name)
    );

    let moodle_closest = "";

    if (moodle_info_matches?.length === 1) {
      // one match
      moodle_info = moodle_info_matches[0];
    } else if (moodle_info_matches?.length > 1) {
      // more then one match
      moodle_closest = closest(
        `${cis_info.name} ${cis_info.type}`,
        moodle_info_matches?.map((info) => info.fullname)!
      );
      moodle_info = moodle_info_matches?.find((info) => info.fullname === moodle_closest);
    } else {
      // no match
      moodle_closest = closest(cis_info.name, moodle_infos?.map((info) => info.fullname)!);
      moodle_info = moodle_infos?.find((info) => info.fullname === moodle_closest);
    }

    const grade: Grade = {
      internal_id: uuidv4(),
      cis_info: cis_info,
      moodle_info: moodle_info!,
      options: {
        exlude: false,
        perm_exlude: cis_info.grade.match(/[1-4]/g) ? false : true,
      },
    };

    if (!moodle_info) {
      console.log("grade:", grade);
      console.log("matches:", moodle_info_matches);
      console.log("closest:", moodle_closest);
      console.log("info:", moodle_info);
    }

    return grade;
  });

  grades.sort(
    (a, b) =>
      moment(b.cis_info.date, "DD.MM.YYYY").unix() - moment(a.cis_info.date, "DD.MM.YYYY").unix()
  );

  return grades;
};
