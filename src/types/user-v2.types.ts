import { ActionMap } from "./context.types";
import { Note } from "./noten.types";

//--------------------------------------------------------------------------------------------------------------------------------------------
// Types
//--------------------------------------------------------------------------------------------------------------------------------------------
export enum UserPayloadType {
  INIT = "INIT_USER",
  UPDATE = "UPDATE_USER",
  UPDATE_NOTE = "UPDATE_USER_NOTE",
  RESET = "RESET_USER",
}

export type User = {
  cookies: UserCookies;
  student_pkz: string;
  pers_nummer?: string;
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
  asp_net_core: string;
  culture: string;
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
    asp_net_core: "",
    culture: "",
  },
  student_pkz: "",
  pers_nummer: "",
  mat_nummer: "",
  name: "",
  course: "",
};

export const USER_COOKIE_KEY = "user";
