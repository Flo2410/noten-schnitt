//--------------------------------------------------------------------------------------------------------------------------------------------
// Enums
//--------------------------------------------------------------------------------------------------------------------------------------------

import { ActionMap } from "./context.types";
import { Note } from "./noten.types";

export enum UserPayloadType {
  INIT = "INIT_USER",
  UPDATE = "UPDATE_USER",
  UPDATE_NOTE = "UPDATE_USER_NOTE",
  RESET = "RESET_USER",
}

//--------------------------------------------------------------------------------------------------------------------------------------------
// Types
//--------------------------------------------------------------------------------------------------------------------------------------------
export type User = {
  cookies: UserCookies;
  pers_nummer: string;
  mat_nummer?: string;
  name?: string;
  course?: string;
};

export type UserPayload = {
  [UserPayloadType.INIT]: User;
  [UserPayloadType.UPDATE]: Partial<User>;
  [UserPayloadType.UPDATE_NOTE]: Partial<Note> & Required<Pick<Note, "internal_id">>;
  [UserPayloadType.RESET]: any;
};

export type UserActions = ActionMap<UserPayload>[keyof ActionMap<UserPayload>];

export type UserCookies = {
  fhwn: string;
  session: string;
};

export interface UserState {
  user: User;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

//--------------------------------------------------------------------------------------------------------------------------------------------
// Constants
//--------------------------------------------------------------------------------------------------------------------------------------------

export const DEFAULT_USER: User = {
  cookies: {
    fhwn: "",
    session: "",
  },
  pers_nummer: "",
  mat_nummer: "",
  name: "",
  course: "",
};

export const USER_COOKIE_KEY = "user";
