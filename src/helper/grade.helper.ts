import "server-only";

import { closest } from "fastest-levenshtein";
import moment from "moment";
import { User } from "next-auth";
import { CISGradeInfo, Grade, GradeInfo, MoodleGradeInfo } from "types/grade.types";
import { MoodleUser } from "types/user.types";
import { get_cis_grade_infos_for_user } from "./fhwn_cis/grades";
import { get_course_info_pdf_url, get_moodle_course_list } from "./moodle/courses";
import { get_ects_for_course, get_raw_course_info_from_pdf } from "./moodle/pdf_parser";

export const make_grades = async (
  cis_infos: CISGradeInfo[],
  moodle_infos: MoodleGradeInfo[]
): Promise<Grade[]> => {
  // CIS Infos are the primary source
  const grades: Grade[] = cis_infos.map((cis_info) => {
    let moodle_info: MoodleGradeInfo | undefined = {
      displayname: "",
      fullname: "",
      id: 0,
      shortname: "",
    };

    // Find the corresponding moodle info
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

  // grades.sort(
  //   (a, b) =>
  //     moment(b.cis_info.date, "DD.MM.YYYY").unix() -
  //     moment(a.cis_info.date, "DD.MM.YYYY").unix()
  // );

  // Sort by semester
  grades.sort(
    (a, b) =>
      +b.cis_info.semester - +a.cis_info.semester ||
      moment(b.cis_info.date, "DD.MM.YYYY").unix() -
        moment(a.cis_info.date, "DD.MM.YYYY").unix()
  );

  return grades;
};

export const get_grades = async (user: User): Promise<Grade[] | null> => {
  const cis_infos = await get_cis_grade_infos_for_user(user);
  const moodle_infos = await get_moodle_course_list(user.moodle_user);

  if (!cis_infos || moodle_infos.length === 0) return null;

  return make_grades(cis_infos, moodle_infos);
};

export const get_grades_with_infos = async (
  user: User
): Promise<Required<Grade>[] | null> => {
  const grades = await get_grades(user);
  if (!grades) return null;
  const promises = grades.map(
    async (grade): Promise<Required<Grade>> => ({
      ...grade,
      grade_info: await get_grade_info(user.moodle_user, grade.moodle_info.id),
    })
  );

  return await Promise.all(promises);
};

export const get_grade_by_id = async (
  user: User,
  grade_id: number
): Promise<Required<Grade> | undefined> => {
  const grades = await get_grades(user);
  const grade = grades?.find((grade) => grade.moodle_info.id === grade_id);
  if (!grade) return;
  grade.grade_info = await get_grade_info(user.moodle_user, grade.moodle_info.id);
  return grade as Required<Grade>;
};

export const get_grade_info = async (
  moodle_user: MoodleUser,
  course_id: number
): Promise<GradeInfo> => {
  const pdf_url = await get_course_info_pdf_url(moodle_user, course_id);
  if (!pdf_url) return {};

  const raw_info = await get_raw_course_info_from_pdf(pdf_url);

  const grade_info: GradeInfo = {
    ects: get_ects_for_course(raw_info),
  };

  return grade_info;
};
