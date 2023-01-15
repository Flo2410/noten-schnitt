import { ActionMap } from "./context.types";
import { Note } from "./noten.types";
import { UserPayloadType } from "./user.types";

//--------------------------------------------------------------------------------------------------------------------------------------------
// Types
//--------------------------------------------------------------------------------------------------------------------------------------------
export type User = {
  cookies: UserCookies;
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

export type UserCookies = {
  asp_net_core: string;
  culture: string;
};

//--------------------------------------------------------------------------------------------------------------------------------------------
// Constants
//--------------------------------------------------------------------------------------------------------------------------------------------

export const DEFAULT_USER: User = {
  cookies: {
    asp_net_core: "",
    culture: "",
  },
  pers_nummer: "",
  mat_nummer: "",
  name: "",
  course: "",
  noten: [],
};

export const USER_COOKIE_KEY = "user";
