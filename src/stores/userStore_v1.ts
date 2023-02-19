import { postLogin } from "helper/apicalls";
import { DEFAULT_USER, UserState } from "types/user.types";
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

        const user = await postLogin(form).catch(() => {
          throw new Error("Login error");
        });

        set({ user });
      },
      logout: () => set({ user: DEFAULT_USER }),
    }),
    {
      name: "user_v1",
    }
  )
);
