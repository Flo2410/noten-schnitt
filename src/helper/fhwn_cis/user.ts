import { log } from "helper/logger";
import { getCookiesAsString } from "helper/utils";
import { User, UserCookies } from "types/user.types";
import * as cheerio from "cheerio";

export const get_user_info = async (
  user_cookies: UserCookies
): Promise<Omit<User, "moodle_user"> | null> => {
  const start_time = Date.now();

  try {
    const user = await request_user_info(user_cookies);
    log("info", undefined, undefined, 200, start_time, Date.now());
    return user;
  } catch (err: any) {
    log("info", undefined, undefined, 401, start_time, Date.now(), {
      error: `Error getting user info - ${err}`,
    });
  }

  return null;
};

const request_user_info = async (user_cookies: UserCookies): Promise<Omit<User, "moodle_user">> => {
  const data = await fetch("https://cis.fhwn.ac.at/Home/Profile", {
    method: "GET",
    headers: {
      "User-Agent": "Mozilla/5.0",
      Cookie: getCookiesAsString(user_cookies),
    },
  });

  // Check if request was redirected to login page
  if (data.url.includes("https://cis.fhwn.ac.at/Home/Index")) {
    throw new Error("Cookie is not valid!");
  }

  const html = await data.text();
  const $ = cheerio.load(html, null, false);

  const pers_nummer = $("#collapseIDS > div > div:nth-child(1) > div.col-sm-9 > b").text();
  const mat_nummer = $("#collapseIDS > div > div:nth-child(2) > div.col-sm-9 > b").text();
  const name = $("#collapseNames > div > div > div.col-sm-9 > b").text();

  const { course, student_pkz } = await get_user_course_and_pkz(user_cookies);

  const user = {
    cookies: user_cookies,
    student_pkz: student_pkz,
    pers_nummer: pers_nummer,
    mat_nummer: mat_nummer,
    name: name,
    course: course,
  };

  return user;
};

const get_user_course_and_pkz = async (
  user_cookies: UserCookies
): Promise<{ course: string; student_pkz: string }> => {
  const data = await fetch(
    "https://cis.fhwn.ac.at/Grades/StudentGradesOverview/GradeOverviewIndex",
    {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0",
        Cookie: getCookiesAsString(user_cookies),
      },
    }
  );

  // Check if request was redirected to login page
  if (data.url.includes("https://cis.fhwn.ac.at/Home/Index")) {
    throw new Error("Cookie is not valid!");
  }

  let html = await data.text();
  const $ = cheerio.load(html, null, false);

  const course = $("#selStudentPKZ").children().text();
  const student_pkz = $("#selStudentPKZ > option")
    .toArray()
    .map((item) => item.attributes[0].value)[0];

  return { course, student_pkz };
};
