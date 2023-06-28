import type { NextApiRequest, NextApiResponse } from "next";
import nodeFetch from "node-fetch";
import fetchCookie from "fetch-cookie";
import { UserCookies } from "types/user.types";
import { log } from "helper/logger";

const fetch = fetchCookie(nodeFetch);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserCookies | string>
) {
  const start_time = Date.now();

  try {
    const user_cookies = await login(req.body.username, req.body.password);

    res.status(200).send(user_cookies);
    log("info", req.method, req.url, 200, start_time, Date.now());
  } catch (error: any) {
    res.status(401).send(`${error}`);
    log("info", req.method, req.url, 401, start_time, Date.now(), {
      error: `Login failed - ${error}`,
    });
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

  if (cookies?.length >= 1) {
    let culture_cookie = "culture=de;";
    let session_cookie = "";

    if (cookies.length === 2) {
      culture_cookie = cookies[0];
      session_cookie = cookies[1];
    } else {
      session_cookie = cookies[0];
    }

    const key = session_cookie.match(/.AspNetCore.Cookies=.*?;/g);

    if (key && key[0].length > 5) {
      return { culture: culture_cookie, asp_net_core: session_cookie };
    }
  }

  throw new Error(await data.text());
};
