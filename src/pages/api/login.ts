import type { NextApiRequest, NextApiResponse } from "next";
import nodeFetch from "node-fetch";
import fetchCookie from "fetch-cookie";
import { User } from "types/user.types";
import { getCookiesAsString } from "helper/utils";
import { log } from "helper/logger";

const fetch = fetchCookie(nodeFetch);

export default async function handler(req: NextApiRequest, res: NextApiResponse<User | "">) {
  const start_time = Date.now();

  try {
    const user = await getKeys()
      .then(({ event_validation, view_state }) =>
        login(view_state, event_validation, req.body.username, req.body.password)
      )
      .then((user) => getUserInfo(user));

    res.status(200).send(user);
    log("info", req.method, req.url, 200, start_time, Date.now(), { course: user.course });
  } catch (error) {
    res.status(401).send("");
    log("info", req.method, req.url, 401, start_time, Date.now(), { error: "Login failed" });
  }
}

interface Keys {
  view_state: string;
  event_validation: string;
}

const getKeys = async (): Promise<Keys> => {
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

  return { view_state: values[0], event_validation: values[1] };
};

const login = async (
  view_state: string,
  event_validation: string,
  username: string,
  password: string
): Promise<User> => {
  // const form = new FormData();
  const form = new URLSearchParams();
  form.append("__VIEWSTATE", view_state);
  form.append("__EVENTVALIDATION", event_validation);
  form.append("txtUsername", username);
  form.append("txtPassword", password);
  form.append("btnLogin", "Login");

  const data = await fetch(
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

  const cookies = await data.headers.raw()["set-cookie"];

  if (cookies?.length > 0) {
    const key = cookies[0].match(/fhwn=.*?;/g);
    if (key && key[0].length > 5) {
      const body_2 = await data.text();
      const pers_nummer = Array.from(body_2.matchAll(/(?<=\()(\d+)(?=\))/g), (m) => m[0])[0];

      const session_cookie = await getSessionCookie(cookies[0]);

      return { cookies: { fhwn: cookies[0], session: session_cookie }, pers_nummer: pers_nummer };
    }
  }

  throw new Error("Unauthorized");
};

const getUserInfo = async (user: User): Promise<User> => {
  const data = await fetch("https://intranet.fhwn.ac.at/services/stu_main.aspx", {
    method: "GET",
    headers: {
      "User-Agent": "Mozilla/5.0",
      Cookie: getCookiesAsString(user.cookies),
    },
  });

  const body = await data.text();
  let name = Array.from(body.matchAll(/(?<=Uberschrift1">).*(?=<)/g), (m) => m[0])[0];
  name = name.substring(name.indexOf(" ") + 1);
  const arr = Array.from(body.matchAll(/(?<=6px;">).+?(?=<)/g), (m) => m[0]);
  const mat_nummer = arr[1];
  // const course = arr[3].match(/(?<=\().+?(?=\))/g)![0];
  const course = "-"; //FIXME: Course not displayed on the intranet site enymore!

  return { ...user, ...{ mat_nummer, name, course } };
};

const getSessionCookie = async (user_cookie: string): Promise<string> => {
  const data = await nodeFetch("https://intranet.fhwn.ac.at/services/index.aspx", {
    method: "GET",
    headers: {
      "User-Agent": "Mozilla/5.0",
      Cookie: user_cookie,
    },
  });

  const cookies = await data.headers.raw()["set-cookie"];

  return cookies[0];
};
