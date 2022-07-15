import { Course, CourseRequestParams } from "types/course.types";
import { Note } from "types/noten.types";
import { User, UserCookies } from "types/user.types";

export const postLogin = (form: URLSearchParams): Promise<User> => {
  return fetch("/api/login", {
    method: "POST",
    body: form,
  }).then((data) => data.json());
};

export const getNoten = (user: User): Promise<Array<Note>> => {
  return fetch("/api/noten", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((data) => data.json());
};

export const getUserInfo = (user_cookies: UserCookies): Promise<User> => {
  return fetch("/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user_cookies),
  }).then((data) => {
    if (data.status !== 200) throw new Error("Cookie not valid!");

    return data.json();
  });
};

export const getCourseInfo = async (
  user_cookies: UserCookies,
  course_request_params: CourseRequestParams
): Promise<Course> => {
  return fetch("/api/course", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...{ cookies: user_cookies }, ...course_request_params }),
  }).then((data) => {
    if (data.status !== 200) throw new Error("Cookie not valid!");

    return data.json();
  });
};
