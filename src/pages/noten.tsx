import NotenSchnitt from "components/ NotenSchnitt";
import NotenListe from "components/NotenListe";
import UserHeader from "components/UserHeader";
import { UserContext } from "context/UserContext";
import Router from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Note } from "types/noten.types";
import { UserPayloadType } from "types/user.types";

const NotenPage = () => {
  const { state: user, dispatch: dispatchUser } = useContext(UserContext);
  const [noten, setNoten] = useState<Array<Note>>([]);

  useEffect(() => {
    if (!user.cookie) Router.push("/login");

    fetch("/api/noten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((data) => data.json())
      .then((data) => {
        // console.log("body", data);

        setNoten(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const logout = () => {
    dispatchUser({
      type: UserPayloadType.RESET,
    });

    Router.push("/login");
  };

  return (
    <div className="flex flex-col items-center">
      <UserHeader user={user} onLogout={() => logout()} />
      <NotenSchnitt noten={noten} />
      <NotenListe noten={noten} />
    </div>
  );
};

export default NotenPage;
