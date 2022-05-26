import type { NextApiRequest, NextApiResponse } from "next";
import nodeFetch from "node-fetch";
import fetchCookie from "fetch-cookie";
import { User, UserCookie } from "types/user.types";

const fetch = fetchCookie(nodeFetch);

export default async function handler(req: NextApiRequest, res: NextApiResponse<User | "">) {
  console.log("POST User");

  const user_cookie: UserCookie = req.body;

  try {
    const user = await getUserInfo(user_cookie);
    res.status(200).send(user);
  } catch (err: any) {
    res.status(401).send("");
  }
}

const getUserInfo = async (user_cokkie: UserCookie): Promise<User> => {
  const data = await fetch("https://intranet.fhwn.ac.at/services/stu_main.aspx", {
    method: "GET",
    headers: {
      "User-Agent": "Mozilla/5.0",
      Cookie: user_cokkie.cookie,
    },
  });

  const body = await data.text();

  // Check if request was redirected to login page
  if (data.url.includes("https://intranet.fhwn.ac.at/services/logon.aspx")) {
    throw new Error("Cookie is not valid!");
  }

  let name = Array.from(body.matchAll(/(?<=Uberschrift1">).*(?=<)/g), (m) => m[0])[0];
  name = name.substring(name.indexOf(" ") + 1);
  const arr = Array.from(body.matchAll(/(?<=6px;">).+?(?=<)/g), (m) => m[0]);
  const mat_nummer = arr[1];
  const pers_nummer_and_course = arr[3].split(" ");
  const pers_nummer = pers_nummer_and_course[0];
  const course = pers_nummer_and_course[1].match(/(?<=\().+?(?=\))/g)![0];

  const user: User = {
    cookie: user_cokkie.cookie,
    pers_nummer: pers_nummer,
    mat_nummer: mat_nummer,
    name: name,
    course: course,
  };

  return user;
};
