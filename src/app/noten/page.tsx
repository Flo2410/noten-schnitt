"use client";
import NotenSchnitt from "components/ NotenSchnitt";
import Footer from "components/Footer";
import Loading from "components/Loading";
import NotenListe from "components/NotenListe";
import Options from "components/Options";
import UserHeader from "components/UserHeader";
import React, { useEffect, useState } from "react";
import { useNotenStore } from "stores/notenStore";
import { useUserStore } from "stores/userStore";
import { DEFAULT_USER, User } from "types/user.types";
import { Note } from "types/noten.types";
import { MissingECTS } from "components/Warning/MissingECTS";
import { useGlobalLogout } from "hooks/useLogout";

const NotenPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [show_excluded, setShowExcluded] = useState(true);
  const user = useUserStore((state) => state.user);

  const [user_state, setUserState] = useState<User>(DEFAULT_USER);
  const [noten_state, setNotenState] = useState<Note[]>([]);

  const [init_noten, noten] = useNotenStore((state) => [state.init, state.noten]);

  const globalLogout = useGlobalLogout();

  useEffect(() => {
    // if (noten.length === 0)
    init_noten(user)
      .then(() => setIsLoading(false))
      .catch(globalLogout);
    // else setIsLoading(false);
  }, []);

  useEffect(() => {
    setUserState(user);
    setNotenState(noten);
  }, [user, noten]);

  return (
    <>
      <div className="flex flex-col items-center min-h-screen px-2 md:px-0 pwa:px-2 body-setup">
        <UserHeader user={user_state} onLogout={globalLogout} />
        <MissingECTS />
        <NotenSchnitt noten={noten_state} />
        <Options show_excluded={show_excluded} setShowExcluded={setShowExcluded} />
        <NotenListe noten={noten_state} show_excluded={show_excluded} />
        <Footer />
        {isLoading && <Loading />}
      </div>
    </>
  );
};

export default NotenPage;
