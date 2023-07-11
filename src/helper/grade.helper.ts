import "server-only";

import { closest } from "fastest-levenshtein";
import moment from "moment";
import { User } from "next-auth";
import { CISGradeInfo, Grade, MoodleGradeInfo } from "types/grade.types";
import { get_cis_grade_infos_for_user } from "./fhwn_cis/grades";
import { get_moodle_course_list } from "./moodle/courses";

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
      moodle_closest = closest(
        `${cis_info.name} ${cis_info.type}`,
        moodle_infos?.map((info) => info.fullname)!
      );
      moodle_info = moodle_infos?.find((info) => info.fullname === moodle_closest);
    }

    const grade: Grade = {
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
      moment(b.cis_info.date, "DD.MM.YYYY").unix() -
      moment(a.cis_info.date, "DD.MM.YYYY").unix()
  );

  return grades;
};

export const get_grades = async (user: User): Promise<Grade[] | null> => {
  const cis_infos = await get_cis_grade_infos_for_user(user);
  const moodle_infos = await get_moodle_course_list(user.moodle_user);

  if (!cis_infos || !moodle_infos) return null;

  return make_grades(cis_infos, moodle_infos);
};

export const get_grade_by_id = async (
  user: User,
  grade_id: number
): Promise<Grade | undefined> => {
  const grades = await get_grades(user);
  return grades?.find((grade) => grade.moodle_info.id === grade_id);
};
