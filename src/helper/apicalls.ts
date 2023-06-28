import { Note } from "types/noten.types";
import { User, UserCookies } from "types/user.types";

export const postLogin = (form: URLSearchParams): Promise<UserCookies> => {
  return fetch("/api/v2/login", {
    method: "POST",
    body: form,
  }).then((data) => data.json());
};

export const getUserInfo = (user_cookies: UserCookies): Promise<User> => {
  return fetch("/api/v2/user", {
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

export const getNoten = (user: Pick<User, "cookies" | "student_pkz">): Promise<Array<Note>> => {
  return fetch("/api/v2/noten", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((data) => data.json());
};
