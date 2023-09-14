import * as cheerio from "cheerio";
import { log } from "helper/logger";
import { getCookiesAsString } from "helper/utils";
import { Course, User, UserCookies } from "types/user.types";

export const get_user_info = async (
  user_cookies: UserCookies
): Promise<Omit<User, "moodle_user" | "email"> | null> => {
  const start_time = Date.now();

  try {
    const user = await request_user_info(user_cookies);
    log("info", undefined, "get_user_info", 200, start_time, Date.now());
    return user;
  } catch (err: any) {
    log("info", undefined, "get_user_info", 401, start_time, Date.now(), {
      error: `Error getting user info - ${err}`,
    });
  }

  return null;
};

const request_user_info = async (
  user_cookies: UserCookies
): Promise<Omit<User, "moodle_user" | "email">> => {
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

  const pers_nummer = $(
    "#collapseIDS > div > div:nth-child(1) > div.col-sm-9 > b"
  ).text();
  const mat_nummer = $("#collapseIDS > div > div:nth-child(2) > div.col-sm-9 > b").text();
  const name = $("#collapseNames > div > div > div.col-sm-9 > b").text();

  const courses = await get_user_courses_and_pkz(user_cookies);

  const user: Omit<User, "moodle_user" | "email"> = {
    cookies: user_cookies,
    pers_nummer: pers_nummer,
    mat_nummer: mat_nummer,
    name: name,
    courses: courses,
    selected_course: courses[0],
  };

  return user;
};

const get_user_courses_and_pkz = async (user_cookies: UserCookies): Promise<Course[]> => {
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

  let html = (await data.json()).Result as string;
  const $ = cheerio.load(html, null, false);

  const options = $("select#selStudentPKZ option");

  const courses: Course[] = [];

  options.each((i, el) => {
    const pkz = $(el).attr("value") ?? "";
    const name = $(el).text();
    courses.push({ student_pkz: pkz, name });
  });

  return courses;
};
