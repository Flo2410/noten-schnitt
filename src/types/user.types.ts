//--------------------------------------------------------------------------------------------------------------------------------------------
// Types
//--------------------------------------------------------------------------------------------------------------------------------------------

export type User = {
  cookies: UserCookies;
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
  email: "",
};
