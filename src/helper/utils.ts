import { UserCookies } from "types/user.types";

// export const getCookiesAsString = (cookies: UserCookies) => cookies.fhwn + "; " + cookies.session;
// export const getCookiesAsStringV2 = (cookies: UserCookiesV2) =>
//   cookies.culture + "; " + cookies.asp_net_core;

export const getCookiesAsString = (cookies: UserCookies) => Object.values(cookies).join(";");
