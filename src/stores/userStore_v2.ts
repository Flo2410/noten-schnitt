import { getUserInfo, postLogin } from "helper/apicalls_v2";
import { DEFAULT_USER, UserState } from "types/user-v2.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: DEFAULT_USER,
      login: async (username, password) => {
        const form = new URLSearchParams();
        form.append("username", username);
        form.append("password", password);

        // const userCookies = await postLogin(form).catch(() => {
        //   throw new Error("Login error");
        // });

        const user = await postLogin(form)
          .then((userCookies) => getUserInfo(userCookies))
          .catch(() => {
            throw new Error("Login error");
          });

        set({ user });
      },
      logout: () => set({ user: DEFAULT_USER }),
    }),
    {
      name: "user_v2",
    }
  )
);
