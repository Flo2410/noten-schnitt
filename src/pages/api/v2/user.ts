import type { NextApiRequest, NextApiResponse } from "next";
import * as cheerio from "cheerio";
import { User, UserCookies } from "types/user-v2.types";
import { getCookiesAsString } from "helper/utils";
import { log } from "helper/logger";

export default async function handler(req: NextApiRequest, res: NextApiResponse<User | "">) {
  const start_time = Date.now();

  const user_cookies: UserCookies = req.body;

  try {
    const user = await getUserInfo(user_cookies);
    res.status(200).send(user);
    log("info", req.method, req.url, 200, start_time, Date.now());
  } catch (err: any) {
    res.status(401).send("");
  }
}

const getUserInfo = async (user_cookies: UserCookies): Promise<User> => {
  const data = await fetch("https://cis.fhwn.ac.at/Home/Profile", {
    method: "GET",
    headers: {
      "User-Agent": "Mozilla/5.0",
      Cookie: getCookiesAsString(user_cookies),
    },
  });

  // Check if request was redirected to login page
  if (data.url.includes("https://cis.fhwn.ac.at/Home/Index")) {
    throw new Error("Cookie is not valid!");
  }

  const html = await data.text();
  const $ = cheerio.load(html, null, false);

  const pers_nummer = $("#collapseIDS > div > div:nth-child(1) > div.col-sm-9 > b").text();
  const mat_nummer = $("#collapseIDS > div > div:nth-child(2) > div.col-sm-9 > b").text();
  const name = $("#collapseNames > div > div > div.col-sm-9 > b").text();

  const course = await getUserCourse(user_cookies);

  const user: User = {
    cookies: user_cookies,
    pers_nummer: pers_nummer,
    mat_nummer: mat_nummer,
    name: name,
    course: course,
  };

  return user;
};

const getUserCourse = async (user_cookies: UserCookies): Promise<string> => {
  const data = await fetch("https://cis.fhwn.ac.at/Grades/StudentGradesOverview/Index", {
    method: "GET",
    headers: {
      "User-Agent": "Mozilla/5.0",
      Cookie: getCookiesAsString(user_cookies),
    },
  });

  // Check if request was redirected to login page
  if (data.url.includes("https://cis.fhwn.ac.at/Home/Index")) {
    throw new Error("Cookie is not valid!");
  }

  const html = await data.text();
  const $ = cheerio.load(html, null, false);

  const course = $("#selStudentPKZ").children().text();
  return course;
};
