import type { NextApiRequest, NextApiResponse } from "next";
import nodeFetch from "node-fetch";
import fetchCookie from "fetch-cookie";

const fetch = fetchCookie(nodeFetch);

interface Noten {
  note: string;
  art: string;
  lv: string;
  ects: string;
  date: string;
  semester: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const data = await fetch(
    "https://intranet.fhwn.ac.at/services/noten/noten.aspx?matnummer=2010830009",
    {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0",
        Cookie: req.body.cookie,
      },
    }
  );

  // console.log(req.body.cookie);

  let body = await data.text();
  // body = body.replace(/\r?\n|\r|\t/g, " ");
  body = body.substring(body.indexOf("<tr>"));
  // body = body.replace(/<!-.*->/g, "");
  // body = body.replace(body.substring(body.indexOf("</table><script")), "");
  body = body.replace(body.substring(body.indexOf("<!--")), "");
  body = body.replaceAll("&nbsp;", "").replaceAll("Lade...", "").replaceAll("&#220;", "Ü");

  const arr = Array.from(body.matchAll(/(?<=>)(.*?)(?=<)/g), (m) => m[0]).filter(String);

  const noten: Array<Noten> = [];
  let count = 0;
  let note: Noten = {
    note: "",
    art: "",
    lv: "",
    ects: "",
    date: "",
    semester: "",
  };

  arr.forEach((item) => {
    switch (count) {
      case 0:
        note.note = item;
        break;
      case 1:
        note.art = item;
        break;
      case 2:
        note.lv = item;
        break;
      case 3:
        note.ects = item;
        break;
      case 4:
        note.date = item;
        break;
      case 5:
        note.semester = item;
        noten.push(note);
        note = {
          note: "",
          art: "",
          lv: "",
          ects: "",
          date: "",
          semester: "",
        };
        break;
    }
    count++;
    if (count >= 6) count = 0;
  });

  noten.splice(0, 1);
  res.status(200).send(noten);
}
