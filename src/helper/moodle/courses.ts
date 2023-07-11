import "server-only";

import MoodleApi, { IMoodleCourse } from "moodle-webservice";
import { MoodleUser } from "types/user.types";
import { MoodleGradeInfo } from "types/grade.types";
import { closest } from "fastest-levenshtein";

export const get_moodle_course_list = async (
  moodle_user: MoodleUser
): Promise<MoodleGradeInfo[]> => {
  const moodle = MoodleApi({
    baseUrl: process.env.NEXT_PUBLIC_MOODLE_URL ?? "",
    token: moodle_user.token,
  });
  const moodle_courses: IMoodleCourse[] = await moodle.core.enrol.getUsersCourses({
    userid: moodle_user.user_id,
  });

  const grade_infos: MoodleGradeInfo[] = moodle_courses.map((course) => ({
    displayname: course.displayname,
    fullname: course.fullname,
    id: course.id,
    shortname: course.shortname,
  }));

  return grade_infos;
};

export const get_course_info_pdf_url = async (
  moodle_user: MoodleUser,
  courseid: number
): Promise<string | null> => {
  const moodle = MoodleApi({
    baseUrl: process.env.NEXT_PUBLIC_MOODLE_URL ?? "",
    token: moodle_user.token,
  });

  const modules = (await moodle.core.course.getContents({ courseid: courseid }))
    .map((section) => section.modules)
    .flat();

  const closest_module_name = closest(
    "LV Beschreibung",
    modules.map((module) => module.name)
  );

  if (!closest_module_name.includes("Beschreibung")) return null;

  const closest_module = modules.find((module) => module.name === closest_module_name);
  if (!closest_module) return null;

  const contents = closest_module.contents;
  if (contents?.length === 0) return null;

  const full_url = contents
    ?.filter((content) => content.fileurl && content.fileurl?.length > 0)
    .shift();
  if (!full_url) return null;

  const url = full_url.fileurl?.split("?").shift();
  if (!url) return null;

  return url;
};
