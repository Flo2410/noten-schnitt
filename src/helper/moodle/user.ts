import MoodleApi from "moodle-webservice";

export const get_moodle_user_info = async (token: string) => {
  const moodle = MoodleApi({
    baseUrl: process.env.NEXT_PUBLIC_MOODLE_URL ?? "",
    token: token,
  });
  return moodle.core.webservice.getSiteInfo();
};
