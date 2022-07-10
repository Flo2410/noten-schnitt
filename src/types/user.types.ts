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
  cookie: string;
  pers_nummer: string;
  mat_nummer?: string;
  name?: string;
  course?: string;
  noten?: Array<Note>;
};

export type UserPayload = {
  [UserPayloadType.INIT]: User;
  [UserPayloadType.UPDATE]: Partial<User>;
  [UserPayloadType.UPDATE_NOTE]: Partial<Note> & Required<Pick<Note, "internal_id">>;
  [UserPayloadType.RESET]: any;
};

export type UserActions = ActionMap<UserPayload>[keyof ActionMap<UserPayload>];

export type UserCookie = Required<Pick<User, "cookie">>;

//--------------------------------------------------------------------------------------------------------------------------------------------
// Constants
//--------------------------------------------------------------------------------------------------------------------------------------------

export const DEFAULT_USER: User = {
  cookie: "",
  pers_nummer: "",
  mat_nummer: "",
  name: "",
  course: "",
  noten: [],
};

export const USER_COOKIE_KEY = "user";
