import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import { Note } from "types/noten.types";
import { v4 as uuidv4 } from "uuid";
import { getCookiesAsString } from "helper/utils";

// const fetch = fetchCookie(nodeFetch);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Note> | string>
) {
  console.log("POST Noten");

  const data = await fetch(
    "https://intranet.fhwn.ac.at/services/noten/noten.aspx?matnummer=" + req.body.pers_nummer,
    {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0",
        Cookie: getCookiesAsString(req.body.cookies),
      },
    }
  );

  let body = await data.text();

  // Check if request was redirected to login page
  if (data.url.includes("https://intranet.fhwn.ac.at/services/logon.aspx")) {
    return res.status(401).send("Cookie is not valid!");
  }

  body = body.substring(body.indexOf("<tr>"));
  body = body.replace(body.substring(body.indexOf("<!--")), "");
  body = body.replaceAll("&nbsp;", "").replaceAll("Lade...", "").replaceAll("&#220;", "Ü");

  const arr = Array.from(body.matchAll(/(?<=>)(.*?)(?=<)/g), (m) => m[0]).filter(String);

  const noten: Array<Note> = [];
  let count = 0;
  let note: Note = {
    internal_id: uuidv4(),
    note: "",
    art: "",
    lv: "",
    ects: "",
    date: "",
    semester: "",
    exlude: false,
    perm_exlude: false,
  };
  const valid_noten = ["1", "2", "3", "4"];

  arr.forEach((item) => {
    switch (count) {
      case 0:
        note.note = item;
        note.perm_exlude = !valid_noten.includes(note.note);
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
          internal_id: uuidv4(),
          note: "",
          art: "",
          lv: "",
          ects: "",
          date: "",
          semester: "",
          exlude: false,
          perm_exlude: false,
        };
        break;
    }
    count++;
    if (count >= 6) count = 0;
  });

  noten.splice(0, 1);
  res.status(200).send(noten);
}
