"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserStore } from "stores/userStore_v2";

const Home = () => {
  const user_v2 = useUserStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user_v2.cookies.asp_net_core) router.push("/noten");
    else router.push("/login");
  }, []);
  return <></>;
};

export default Home;
