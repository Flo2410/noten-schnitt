import type { NextApiRequest, NextApiResponse } from "next";
import * as cheerio from "cheerio";
import { v4 as uuidv4 } from "uuid";
import { getCookiesAsString } from "helper/utils";
import { log } from "helper/logger";
import { Note } from "types/noten.types";
import { UserCookies } from "types/user-v2.types";
// const fetch = fetchCookie(nodeFetch);

export default async function handler(
  req: NextApiRequest,
  // res: NextApiResponse<Array<Note> | string>
  res: NextApiResponse<any>
) {
  const start_time = Date.now();

  const dates = await getSemsterDates(req.body.cookies);

  const promises = dates.map((date) =>
    getNotenForSemester(req.body.cookies, req.body.student_pkz, date)
  );

  const noten = await (await Promise.all(promises)).flat();

  res.status(200).send(noten);
  log("info", req.method, req.url, 200, start_time, Date.now());
}

const getSemsterDates = async (cookies: UserCookies) => {
  const data = await fetch(`https://cis.fhwn.ac.at/Grades/StudentGradesOverview/Index`, {
    method: "GET",
    headers: {
      "User-Agent": "Mozilla/5.0",
      Cookie: getCookiesAsString(cookies),
    },
  });

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

const getNotenForSemester = async (
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

    let note: Note = {
      internal_id: uuidv4(),
      note: arr[1].match(/\d/g)?.[0] ?? "",
      art: art,
      lv: lv,
      ects: "",
      date: semester_date,
      semester: semester,
      exlude: false,
      perm_exlude: false,
      source: "CIS",
    };

    return note;
  });

  return noten;
};
