import { UserContext } from "context/UserContext";
import Router from "next/router";
import { useContext, useEffect } from "react";

const Home = () => {
  const { state: user, dispatch: dispatchUser } = useContext(UserContext);
  useEffect(() => {
    if (user.cookies.fhwn) Router.push("/noten");
    else Router.push("/login");
  }, []);
  return <></>;
};

export default Home;
