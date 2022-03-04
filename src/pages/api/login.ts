import type { NextApiRequest, NextApiResponse } from "next";
import nodeFetch from "node-fetch";
import fetchCookie from "fetch-cookie";

const fetch = fetchCookie(nodeFetch);

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const data = await fetch("https://intranet.fhwn.ac.at/services/logon.aspx", {
    method: "GET",
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
  });

  const body = await data.text();
  const inps = Array.from(body.matchAll(/<input.*\/>/g), (m) => m[0]);
  const values: Array<string> = [];

  inps.forEach((inp: string) => {
    const match = /value=".*?"/g.exec(inp);
    if (match) values.push(match[0]);
  });

  values.pop();

  values.forEach((val, i) => {
    values[i] = val.replace('value="', "").replace('"', "");
  });

  values.forEach((val, i) => {
    if (!values[i]) values.splice(i, 1);
  });

  values.splice(1, 2);

  // const form = new FormData();
  const form = new URLSearchParams();
  form.append("__VIEWSTATE", values[0]);
  form.append("__EVENTVALIDATION", values[1]);
  form.append("txtUsername", req.body.username);
  form.append("txtPassword", req.body.password);
  form.append("btnLogin", "Login");

  const data_2 = await fetch(
    "https://intranet.fhwn.ac.at/services/logon.aspx?ReturnUrl=/services/index.aspx",
    // "http://127.0.0.1:9090/services/logon.aspx?ReturnUrl=/services/index.aspx",
    {
      method: "POST",
      body: form,
      // follow: 0,
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const cookies = await data_2.headers.raw()["set-cookie"];

  if (cookies.length > 0) {
    const key = cookies[0].match(/fhwn=.*?;/g);
    if (key && key[0].length > 5) {
      const body_2 = await data_2.text();
      const mat = Array.from(body_2.matchAll(/(?<=\()(\d+)(?=\))/g), (m) => m[0])[0];

      return res.status(200).send({ cookie: cookies[0], matnummer: mat });
    }
  }
  res.status(403).send("");
}
