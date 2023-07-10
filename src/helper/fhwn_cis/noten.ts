import { getCookiesAsString } from "helper/utils";
import { UserCookies } from "types/user.types";
import * as cheerio from "cheerio";
import { Note } from "types/noten.types";
import { v4 as uuidv4 } from "uuid";
import { log } from "helper/logger";
import { User } from "next-auth";
import moment from "moment";

export const get_noten_for_user = async (user: User): Promise<Note[] | null> => {
  const start_time = Date.now();

  try {
    const dates = await get_semster_dates(user.cookies);

    const promises = dates.map((date) =>
      get_noten_for_semester(user.cookies, user.student_pkz, date)
    );

    const noten = await (await Promise.all(promises)).flat();

    noten.sort((a, b) => moment(b.date, "DD.MM.YYYY").unix() - moment(a.date, "DD.MM.YYYY").unix());

    log("info", undefined, undefined, 200, start_time, Date.now());

    return noten;
  } catch (err: any) {
    log("info", undefined, undefined, 401, start_time, Date.now(), {
      error: `Error getting grades - ${err}`,
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

const get_noten_for_semester = async (
  cookies: UserCookies,
  student_pkz: string,
  semester_date: string
) => {
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

  const noten = trs.map((tr) => {
    const arr = tr
      .replaceAll("<td>", "")
      .split("</td>")
      .filter((item) => item);

    const art = arr[0].match(/(?<=\()(.*?)(?=\))/g)?.[0] ?? "";
    const lv = arr[0].replace(`(${art})`, "").trim();
    const grade = arr[1].match(/\d/g)?.[0] ?? "";

    let note: Note = {
      internal_id: uuidv4(),
      note: grade,
      art: art,
      lv: lv,
      ects: "",
      date: semester_date,
      semester: semester,
      exlude: false,
      perm_exlude: grade.match(/[1-4]/g) ? false : true,
      source: "CIS",
    };

    return note;
  });

  return noten;
};
