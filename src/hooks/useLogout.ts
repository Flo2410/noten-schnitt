import { useRouter } from "next/router";
import { useNotenStore } from "stores/notenStore";
import { useUserStore as useUserStore_v1 } from "stores/userStore_v1";
import { useUserStore as useUserStore_v2 } from "stores/userStore_v2";

export const useGlobalLogout = () => {
  const logout_v1 = useUserStore_v1((state) => state.logout);
  const logout_v2 = useUserStore_v2((state) => state.logout);
  const clear_noten = useNotenStore((state) => state.clear);

  const router = useRouter();

  return () => {
    logout_v1();
    logout_v2();
    clear_noten();
    router.push("/login");
  };
};
