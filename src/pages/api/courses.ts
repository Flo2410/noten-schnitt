import fetch from "node-fetch";

import { NextApiRequest, NextApiResponse } from "next";
import { getCookiesAsString } from "helper/utils";
import { CourseList } from "types/course.types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CourseList | string>
) {
  console.log("POST Courses");

  let semester: string = req.body.semester ? req.body.semester : "1";

  // verify that the provided semester is a number
  let isnum = /^\d+$/.test(semester);
  if (!isnum) {
    semester = "1";
  }

  const data = await fetch(
    //https://intranet.fhwn.ac.at/services/index.aspx?rtvID=RadTreeView2&rtnLevel=2&rtnID=t1&rtnParentPosition=110&rtnText=2.Semester&rtnValue=4%232010830009&rtnCategory=AllLVSem&rtnChecked=0
    `https://intranet.fhwn.ac.at/services/index.aspx?rtvID=RadTreeView2&rtnLevel=2&rtnParentPosition=110&rtnValue=${semester}%232010830009&rtnCategory=AllLVSem`,
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

  const arr = Array.from(body.matchAll(/(?<=<a)(.*?)(?=<\/)/gs), (m) => m[0].trim()).filter(String);

  const course_list: CourseList = [];

  arr.forEach((str) => {
    const name = str.match(/(?<=>)[\w].*/g)![0];
    const id = str.match(/(?<=lvnr=)(.+?)(?=")/g)![0];

    course_list.push({ id: id, name: name });
  });

  res.send(course_list);
}
