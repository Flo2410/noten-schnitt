import * as cheerio from "cheerio";
import { log } from "helper/logger";
import { getCookiesAsString } from "helper/utils";
import moment from "moment";
import { User } from "next-auth";
import { CISGradeInfo } from "types/grade.types";
import { UserCookies } from "types/user.types";

export const get_cis_grade_infos_for_user = async (
  user: User
): Promise<CISGradeInfo[] | null> => {
  const start_time = Date.now();

  try {
    const dates = await get_semster_dates(user.cookies);

    const promises = dates.map((date) =>
      get_cis_grade_infos_for_semester(user.cookies, user.student_pkz, date)
    );

    const grade_infos = await (await Promise.all(promises)).flat();

    grade_infos.sort(
      (a, b) => moment(b.date, "DD.MM.YYYY").unix() - moment(a.date, "DD.MM.YYYY").unix()
    );

    log("info", undefined, undefined, 200, start_time, Date.now());

    return grade_infos;
  } catch (err: any) {
    log("info", undefined, undefined, 401, start_time, Date.now(), {
      error: `Error getting cis grade infos - ${err}`,
    });
  }

  return null;
};

const get_semster_dates = async (cookies: UserCookies) => {
  const data = await fetch(
    `https://cis.fhwn.ac.at/Grades/StudentGradesOverview/GradeOverviewIndex`,
    {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0",
        Cookie: getCookiesAsString(cookies),
      },
    }
  );

  // Check if request was redirected to login page
  if (data.url.includes("https://cis.fhwn.ac.at/Home/Index")) {
    throw new Error("Cookie is not valid!");
  }

  let html = await data.text();
  html = html.replaceAll("\t", "").replaceAll("\r", "").replaceAll("\n", "");
  const $ = cheerio.load(html, null, false);

  const dates = $("#selSemester > option")
    .toArray()
    .map((item) => item.attributes[0].value)
    .filter((item) => item !== "placeholder");
  return dates;
};

const get_cis_grade_infos_for_semester = async (
  cookies: UserCookies,
  student_pkz: string,
  semester_date: string
): Promise<CISGradeInfo[]> => {
  const data = await fetch(
    `https://cis.fhwn.ac.at/Grades/StudentGradesOverview/GradesList?bisdatum=${semester_date}&selectedPkzFromStudent=${student_pkz}`,
    {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0",
        Cookie: getCookiesAsString(cookies),
      },
    }
  );

  // Check if request was redirected to login page
  if (data.url.includes("https://cis.fhwn.ac.at/Home/Index")) {
    throw new Error("Cookie is not valid!");
  }

  const json = await data.json();
  let html = json.Result as string;
  html = html.replaceAll("\t", "").replaceAll("\r", "").replaceAll("\n", "");

  const $ = cheerio.load(html, null, false);

  const tbody = $("div.viewDesktop > div.accordion > div > div > div > table > tbody");

  const semester = $("h4.smallerText").first().text().match(/\d/g)?.[0] ?? "";

  const trs = tbody
    .toString()
    .replace("<tbody>", "")
    .replace("</tbody>", "")
    .replaceAll("<tr>", "")
    .split("</tr>")
    .filter((item) => item);

  const grade_infos: CISGradeInfo[] = trs.map((tr) => {
    const arr = tr
      .replaceAll("<td>", "")
      .split("</td>")
      .filter((item) => item);

    const art = arr[0].match(/(?<=\()(.*?)(?=\))/g)?.[0] ?? "";
    const lv = arr[0].replace(`(${art})`, "").trim();
    const grade = arr[1].match(/\d/g)?.[0] ?? "";

    const grade_info: CISGradeInfo = {
      name: lv,
      type: art,
      semester: semester,
      date: semester_date,
      grade: grade,
    };

    return grade_info;
  });

  return grade_infos;
};
