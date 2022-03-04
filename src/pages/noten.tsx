import NotenSchnitt from "components/ NotenSchnitt";
import NotenListe from "components/NotenListe";
import NotenRow from "components/NotenRow";
import { UserContext } from "context/UserContext";
import Router from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Note } from "types/noten.types";

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

  return (
    <div className="flex flex-col items-center bg-gray-200 ">
      <NotenSchnitt noten={noten} />
      <NotenListe noten={noten} />
    </div>
  );
};

export default NotenPage;
