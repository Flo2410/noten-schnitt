import "server-only";

import MoodleApi, { IMoodleCourse } from "moodle-webservice";
import { MoodleUser } from "types/user.types";
import { MoodleGradeInfo } from "types/grade.types";

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
