import { Note } from "types/noten.types";
import { User, UserCookie } from "types/user.types";

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

export const getUserInfo = (user_cokkie: UserCookie): Promise<User> => {
  return fetch("/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user_cokkie),
  }).then((data) => {
    if (data.status !== 200) throw new Error("Cookie not valid!");

    return data.json();
  });
};
