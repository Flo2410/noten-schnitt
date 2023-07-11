import { log } from "helper/logger";
import { UserCookies } from "types/user.types";

export const login = async (
  username: string,
  password: string
): Promise<UserCookies | null> => {
  const start_time = Date.now();

  try {
    const user_cookies = await send_login_request(username, password);
    log("info", undefined, undefined, 200, start_time, Date.now());
    if (user_cookies) return user_cookies;
  } catch (error: any) {
    log("info", undefined, undefined, 401, start_time, Date.now(), {
      error: `Login failed - ${error}`,
    });
  }

  return null;
};

const send_login_request = async (
  username: string,
  password: string
): Promise<UserCookies | undefined> => {
  // const form = new FormData();
  const form = new URLSearchParams();
  form.append("Email", username);
  form.append("Password", password);
  form.append("login", "Anmelden");
  form.append("SelectedLanguage", "de"); //TODO: allow for changing the language
  form.append("X-Requested-With", "XMLHttpRequest");

  const res = await fetch(
    "https://cis.fhwn.ac.at/Home/Login",
    // "http://127.0.0.1:9090/services/logon.aspx?ReturnUrl=/services/index.aspx",
    {
      method: "POST",
      body: form,
      // follow: 0,
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  //@ts-ignore
  const cookies: string[] = res.headers.getSetCookie(); // TODO: Report bug to TypeScript! The type is missing

  if (cookies?.length >= 1) {
    let culture_cookie = "culture=de;";
    let session_cookie = "";

    if (cookies.length === 2) {
      culture_cookie = cookies[0];
      session_cookie = cookies[1];
    } else {
      session_cookie = cookies[0];
    }

    const key = session_cookie.match(/.AspNetCore.Cookies=.*?;/g);

    if (key && key[0].length > 5) {
      return { culture: culture_cookie, asp_net_core: session_cookie };
    }
  }

  throw new Error(await res.text());
};
