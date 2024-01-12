import "server-only";

import { closest } from "fastest-levenshtein";
import MoodleApi, { IMoodleCourse, IMoodleCourseSectionModule } from "moodle-webservice";
import { MoodleGradeInfo } from "types/grade.types";
import { MoodleUser } from "types/user.types";

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
  course_id: number
): Promise<string | null> => {
  const moodle = MoodleApi({
    baseUrl: process.env.NEXT_PUBLIC_MOODLE_URL ?? "",
    token: moodle_user.token,
  });

  const modules = (await moodle.core.course.getContents({ courseid: course_id }))
    .map((section) => section.modules)
    .flat();

  if (modules.length === 0) return null;

  const closest_module_name_ger = get_closetst_module_german(modules);
  const closest_module_name_eng = get_closetst_module_english(modules);

  if (!closest_module_name_ger && !closest_module_name_eng) return null;

  const closest_module_name = closest_module_name_ger ?? closest_module_name_eng;

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

  return `${url}?token=${moodle_user.token}`;
};

const get_closetst_module_german = (modules: IMoodleCourseSectionModule[]) => {
  const closest_module_name = closest(
    "LV Beschreibung",
    modules.map((module) => module.name)
  );

  if (!closest_module_name.includes("Beschreibung")) return null;
  return closest_module_name;
};

const get_closetst_module_english = (modules: IMoodleCourseSectionModule[]) => {
  const closest_module_name = closest(
    "Course description",
    modules.map((module) => module.name)
  );

  if (!closest_module_name.includes("Course")) return null;
  return closest_module_name;
};
