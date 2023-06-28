"use client";
import { useRouter } from "next/navigation";
import { useNotenStore } from "stores/notenStore";
import { useUserStore as useUserStore_v2 } from "stores/userStore_v2";

export const useGlobalLogout = () => {
  const logout_v2 = useUserStore_v2((state) => state.logout);
  const clear_noten = useNotenStore((state) => state.clear);

  const router = useRouter();

  return (redirect = true) => {
    logout_v2();
    clear_noten();
    if (redirect) router.push("/login");
  };
};
