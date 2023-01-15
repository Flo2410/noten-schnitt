import type { NextApiRequest, NextApiResponse } from "next";
import nodeFetch from "node-fetch";
import fetchCookie from "fetch-cookie";
import { User, UserCookies } from "types/user-v2.types";
import { log } from "helper/logger";

const fetch = fetchCookie(nodeFetch);

export default async function handler(req: NextApiRequest, res: NextApiResponse<UserCookies | "">) {
  const start_time = Date.now();

  try {
    const user_cookies = await login(req.body.username, req.body.password);

    res.status(200).send(user_cookies);
    log("info", req.method, req.url, 200, start_time, Date.now());
  } catch (error) {
    res.status(401).send("");
    log("info", req.method, req.url, 401, start_time, Date.now(), { error: "Login failed" });
  }
}

const login = async (username: string, password: string): Promise<UserCookies> => {
  // const form = new FormData();
  const form = new URLSearchParams();
  form.append("Email", username);
  form.append("Password", password);
  form.append("login", "Anmelden");
  form.append("SelectedLanguage", "de"); //TODO: allow for changing the language
  form.append("X-Requested-With", "XMLHttpRequest");

  const data = await fetch(
    "https://cis.fhwn.ac.at/Home/Login",
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

  if (cookies?.length > 1) {
    const key = cookies[1].match(/.AspNetCore.Cookies=.*?;/g);

    if (key && key[0].length > 5) {
      return { culture: cookies[0], asp_net_core: cookies[1] };
    }
  }

  throw new Error("Unauthorized");
};

// const getUserInfo = async (user: User): Promise<User> => {
//   const data = await fetch("https://intranet.fhwn.ac.at/services/stu_main.aspx", {
//     method: "GET",
//     headers: {
//       "User-Agent": "Mozilla/5.0",
//       Cookie: getCookiesAsString(user.cookies),
//     },
//   });

//   const body = await data.text();
//   let name = Array.from(body.matchAll(/(?<=Uberschrift1">).*(?=<)/g), (m) => m[0])[0];
//   name = name.substring(name.indexOf(" ") + 1);
//   const arr = Array.from(body.matchAll(/(?<=6px;">).+?(?=<)/g), (m) => m[0]);
//   const mat_nummer = arr[1];
//   // const course = arr[3].match(/(?<=\().+?(?=\))/g)![0];
//   const course = "-"; //FIXME: Course not displayed on the intranet site enymore!

//   return { ...user, ...{ mat_nummer, name, course } };
// };
