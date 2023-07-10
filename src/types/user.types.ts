//--------------------------------------------------------------------------------------------------------------------------------------------
// Types
//--------------------------------------------------------------------------------------------------------------------------------------------

export type User = {
  cookies: UserCookies;
  moodle_token: string;
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
  moodle_token: "",
  student_pkz: "",
  pers_nummer: "",
  mat_nummer: "",
  name: "",
  course: "",
  email: "",
};
