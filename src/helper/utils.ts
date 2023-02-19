import { UserCookies } from "types/user.types";
import { UserCookies as UserCookiesV2 } from "types/user-v2.types";
import { useUserStore } from "stores/userStore_v1";

// export const getCookiesAsString = (cookies: UserCookies) => cookies.fhwn + "; " + cookies.session;
// export const getCookiesAsStringV2 = (cookies: UserCookiesV2) =>
//   cookies.culture + "; " + cookies.asp_net_core;

export const getCookiesAsString = (cookies: UserCookies | UserCookiesV2) =>
  Object.values(cookies).join(";");
