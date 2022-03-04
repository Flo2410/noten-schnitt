import { UserContext } from "context/UserContext";
import Router from "next/router";
import React, { useContext, useEffect } from "react";

const NotenPage = () => {
  const { state: user, dispatch: dispatchUser } = useContext(UserContext);

  useEffect(() => {
    if (!user.cookie) Router.push("/login");
  }, []);

  return <div>{user.matnummer}</div>;
};

export default NotenPage;
