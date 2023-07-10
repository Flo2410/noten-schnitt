import MoodleApi from "moodle-webservice";

export const get_moodle_user_info = async (token: string) => {
  const moodle = MoodleApi({ baseUrl: process.env.MOODLE_URL ?? "", token: token });
  return moodle.core.webservice.getSiteInfo();
};
