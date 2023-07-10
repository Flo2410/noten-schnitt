//--------------------------------------------------------------------------------------------------------------------------------------------
// Types
//--------------------------------------------------------------------------------------------------------------------------------------------

export interface MoodleUser {
  token: string;
  user_name: string;
  first_name: string;
  last_name: string;
  full_name: string;
  lang: string;
  user_id: number;
  user_picture_url: string;
}

export type User = {
  cookies: UserCookies;
  moodle_user: MoodleUser;
  student_pkz: string;
  pers_nummer?: string;
  mat_nummer?: string;
  name?: string;
  course?: string;
  email?: string;
};

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
  moodle_user: {
    token: "",
    user_id: 0,
    first_name: "",
    full_name: "",
    lang: "",
    last_name: "",
    user_name: "",
    user_picture_url: "",
  },
  student_pkz: "",
  pers_nummer: "",
  mat_nummer: "",
  name: "",
  course: "",
  email: "",
};
