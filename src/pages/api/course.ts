import fetch from "node-fetch";
import { NextApiRequest, NextApiResponse } from "next";
import {
  Course,
  CourseOverview,
  CoursePreview,
  CoursePreviewList,
  CourseTimetable,
} from "types/course.types";
import { getCookiesAsString } from "helper/utils";
import { UserCookies } from "types/user.types";
import { log } from "helper/logger";

export default async function handler(req: NextApiRequest, res: NextApiResponse<Course | string>) {
  const start_time = Date.now();

  const course_fullname: string = req.body.course_fullname;
  const course_semester: string = req.body.course_semester;
  const cookies: UserCookies = req.body.cookies;

  // Get the list of cources for the given semester
  const course_list = await getCoursesFromIntranet(course_semester, cookies).catch(() => {
    res.status(401).send("Cookie is not valid!");
  });

  if (!course_list)
    return res.status(404).send(`No courses found for the semester ${course_semester}`);

  // search course list for the course name
  let course_preview_found: CoursePreview | null = null;
  course_list.forEach((course_preview) => {
    if (course_preview.fullname === course_fullname) {
      course_preview_found = course_preview;
    }
  });

  if (!course_preview_found) {
    const error = `No course ${course_fullname} found in semester ${course_semester}!`;
    log("info", req.method, req.url, 404, start_time, Date.now(), {
      course_fullname: course_fullname,
      course_semester: course_semester,
      error: error,
      course_list: course_list,
    });
    return res.status(404).send(error);
  }

  // Get the course info
  const course = await getCourseInfoFromIntranet(course_preview_found, cookies).catch(() => {
    res.status(401).send("Cookie is not valid!2");
    log("info", req.method, req.url, 401, start_time, Date.now(), {
      course_fullname: course_fullname,
      course_semester: course_semester,
      error: "Cookie is not valid!2",
    });
  });

  if (!course)
    return res.status(404).send(`Course info for ${course_fullname} could not be fetched!`);

  res.send(course);
  log("info", req.method, req.url, 200, start_time, Date.now(), {
    course_fullname: course_fullname,
    course_semester: course_semester,
  });
}

const getCourseInfoFromIntranet = async (
  course_preview: CoursePreview,
  cookies: UserCookies
): Promise<Course> => {
  const AbortController = globalThis.AbortController;
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, 5000);

  const data = await fetch(
    // https://intranet.fhwn.ac.at/Services/lvdokus/view_lv.aspx?stu=0&lvnr=18951
    `https://intranet.fhwn.ac.at/Services/lvdokus/view_lv.aspx?stu=0&lvnr=${course_preview.id}`,
    {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0",
        Cookie: getCookiesAsString(cookies),
      },
    }
  );

  if (!controller.signal.aborted) clearTimeout(timeout);

  let body = await data.text();

  // Check if request was redirected to login page
  if (data.url.includes("https://intranet.fhwn.ac.at/services/logon.aspx")) {
    throw new Error("Cookie is not valid!");
  }

  /**
   * Timespan
   */
  let arr_timetable = Array.from(
    body.matchAll(/(?<=<div id="terminspan">)(.*?)(?=<\/table>)/gs),
    (m) => m[0]
  ).filter(String);

  const timespan_str = arr_timetable[0].trim();

  arr_timetable = Array.from(timespan_str.matchAll(/(?<=<td>)([\s\S]*?)(?=<\/td>)/g), (m) => {
    let str = m[0].replace("&nbsp;", "").trim();

    if (str.includes("span")) {
      const mat = str.match(/(?<=>)(.*?)(?=<)/g);
      if (mat) str = mat[0];
    }

    if (str.includes("mailto")) {
      str = str.replace(/(?=<a)(.*)(?<=>)/g, "").trim();
    }

    return str;
  });

  const course_timetable: CourseTimetable = [];

  for (let i = 0; i < arr_timetable.length; i += 8) {
    course_timetable.push({
      date: arr_timetable[i],
      day: arr_timetable[i + 1],
      start_time: arr_timetable[i + 2],
      end_time: arr_timetable[i + 3],
      lecturer: arr_timetable[i + 4],
      room: arr_timetable[i + 5],
      distance_learning: arr_timetable[i + 6],
      exam: arr_timetable[i + 7],
    });
  }

  /**
   * Lehrveranstaltungsbeschreibung
   */
  let arr_course_overview = Array.from(
    body.matchAll(/(?<=class="dxtc-content">)(.*?)(?=<\/div>)/gs),
    (m) => m[0]
  ).filter(String);

  const course_overview: CourseOverview = [];

  // Check if there is an course overview
  if (arr_course_overview.length > 0) {
    const course_overview_str = arr_course_overview[0].trim();
    arr_course_overview = Array.from(
      course_overview_str.matchAll(/(?<=<td)([\s\S]+?)(?<=<\/td)/g),
      (m) => {
        const str = m[0].match(/(?<=>)(.*?)(?=<)/g);
        if (str) return str[0].trim();
        return "";
      }
    );

    for (let i = 0; i < arr_course_overview.length; i += 2) {
      course_overview.push({
        key: arr_course_overview[i],
        value: arr_course_overview[i + 1],
      });
    }
  }

  // Build the final object
  const course: Course = {
    id: course_preview.id,
    fullname: course_preview.fullname,
    course_overview: course_overview,
    timetable: course_timetable,
  };

  return course;
};

const getCoursesFromIntranet = async (
  semester: string,
  cookies: UserCookies
): Promise<CoursePreviewList> => {
  const data = await fetch(
    //https://intranet.fhwn.ac.at/services/index.aspx?rtvID=RadTreeView2&rtnLevel=2&rtnID=t1&rtnParentPosition=110&rtnText=2.Semester&rtnValue=4%232010830009&rtnCategory=AllLVSem&rtnChecked=0
    `https://intranet.fhwn.ac.at/services/index.aspx?rtvID=RadTreeView2&rtnLevel=2&rtnParentPosition=110&rtnValue=${semester}%232010830009&rtnCategory=AllLVSem`,
    {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0",
        Cookie: getCookiesAsString(cookies),
      },
    }
  );

  let body = await data.text();

  // Check if request was redirected to login page
  if (data.url.includes("https://intranet.fhwn.ac.at/services/logon.aspx")) {
    throw new Error("Cookie is not valid!");
  }

  const arr = Array.from(body.matchAll(/(?<=<a)(.*?)(?=<\/)/gs), (m) => m[0].trim()).filter(String);

  const course_list: CoursePreviewList = [];

  arr.forEach((str) => {
    const fullname = str.match(/(?<=>)[\w].*/g)![0];
    const id = str.match(/(?<=lvnr=)(.+?)(?=")/g)![0];

    course_list.push({ id: id, fullname: fullname });
  });

  return course_list;
};
