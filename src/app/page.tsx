"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserStore } from "stores/userStore";

const Home = () => {
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user.cookies.asp_net_core) router.push("/noten");
    else router.push("/login");
  }, []);
  return <></>;
};

export default Home;
