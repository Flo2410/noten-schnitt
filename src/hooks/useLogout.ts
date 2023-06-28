"use client";
import { useRouter } from "next/navigation";
import { useNotenStore } from "stores/notenStore";
import { useUserStore } from "stores/userStore";

export const useGlobalLogout = () => {
  const logout = useUserStore((state) => state.logout);
  const clear_noten = useNotenStore((state) => state.clear);

  const router = useRouter();

  return (redirect = true) => {
    logout();
    clear_noten();
    if (redirect) router.push("/login");
  };
};
