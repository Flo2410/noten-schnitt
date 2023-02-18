import Router from "next/router";
import { useEffect } from "react";
import { useUserStore as useUserStore_v1 } from "stores/userStore_v1";
import { useUserStore } from "stores/userStore_v2";

const Home = () => {
  const user_v1 = useUserStore_v1((state) => state.user);
  const user_v2 = useUserStore((state) => state.user);

  useEffect(() => {
    if (user_v1.cookies.fhwn && user_v2.cookies.asp_net_core) Router.push("/noten");
    else Router.push("/login");
  }, []);
  return <></>;
};

export default Home;
