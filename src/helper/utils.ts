import { UserCookies } from "types/user.types";

export const getCookiesAsString = (cookies: UserCookies) => cookies.fhwn + "; " + cookies.session;
