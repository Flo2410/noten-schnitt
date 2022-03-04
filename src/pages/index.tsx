import { UserContext } from "context/UserContext";
import type { NextPage } from "next";
import Router from "next/router";
import { useContext, useEffect } from "react";

const Home = () => {
  const { state: user, dispatch: dispatchUser } = useContext(UserContext);
  useEffect(() => {
    if (user.cookie) Router.push("/noten");
    else Router.push("/login");
  }, []);
  return <></>;
};

export default Home;
