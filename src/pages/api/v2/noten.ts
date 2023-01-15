import type { NextApiRequest, NextApiResponse } from "next";
import * as cheerio from "cheerio";
import { getCookiesAsString } from "helper/utils";
import { log } from "helper/logger";

// const fetch = fetchCookie(nodeFetch);

export default async function handler(
  req: NextApiRequest,
  // res: NextApiResponse<Array<Note> | string>
  res: NextApiResponse<any>
) {
  const start_time = Date.now();

  const data = await fetch(
    `https://cis.fhwn.ac.at/Grades/StudentGradesOverview/GradesList?bisdatum=15.11.2022&selectedPkzFromStudent=${req.body.pers_nummer}`,
    {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0",
        Cookie: getCookiesAsString(req.body.cookies),
      },
    }
  );

  // Check if request was redirected to login page
  if (data.url.includes("https://cis.fhwn.ac.at/Home/Index")) {
    throw new Error("Cookie is not valid!");
  }

  const json = await data.json();
  let html = json.Result as string;
  html = html.replaceAll("\t", "").replaceAll("\r", "");

  const $ = cheerio.load(html, null, false);

  const tbody = $("#collapse5 > div > table > tbody");
  const noten = tbody.map(function (i, el) {
    return $(this)
      .text()
      .trim()
      .split("\n")
      .filter((value) => value.length > 0);
  });

  // const noten: Array<Note> = [];
  // let count = 0;
  // let note: Note = {
  //   internal_id: uuidv4(),
  //   note: "",
  //   art: "",
  //   lv: "",
  //   ects: "",
  //   date: "",
  //   semester: "",
  //   exlude: false,
  //   perm_exlude: false,
  // };
  // const valid_noten = ["1", "2", "3", "4"];

  // arr.forEach((item) => {
  //   switch (count) {
  //     case 0:
  //       note.note = item;
  //       note.perm_exlude = !valid_noten.includes(note.note);
  //       break;
  //     case 1:
  //       note.art = item;
  //       break;
  //     case 2:
  //       note.lv = item;
  //       break;
  //     case 3:
  //       note.ects = item;
  //       break;
  //     case 4:
  //       note.date = item;
  //       break;
  //     case 5:
  //       note.semester = item;
  //       noten.push(note);
  //       note = {
  //         internal_id: uuidv4(),
  //         note: "",
  //         art: "",
  //         lv: "",
  //         ects: "",
  //         date: "",
  //         semester: "",
  //         exlude: false,
  //         perm_exlude: false,
  //       };
  //       break;
  //   }
  //   count++;
  //   if (count >= 6) count = 0;
  // });

  // noten.splice(0, 1);
  res.status(200).send(noten);
  log("info", req.method, req.url, 200, start_time, Date.now());
}
