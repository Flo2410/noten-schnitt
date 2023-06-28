"use client";
import NotenSchnitt from "components/ NotenSchnitt";
import Footer from "components/Footer";
import Loading from "components/Loading";
import NotenListe from "components/NotenListe";
import NotenModal from "components/NotenModal";
import Options from "components/Options";
import UserHeader from "components/UserHeader";
import React, { useEffect, useState } from "react";
import { useNotenStore } from "stores/notenStore";
import { useUserStore } from "stores/userStore_v2";
import { DEFAULT_USER, User } from "types/user-v2.types";
import { Note } from "types/noten.types";
import { MissingECTS } from "components/Warning/MissingECTS";
import { useGlobalLogout } from "hooks/useLogout";

const NotenPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [show_excluded, setShowExcluded] = useState(true);
  const user_v2 = useUserStore((state) => state.user);

  const [user_v2_state, setUser_v2_state] = useState<User>(DEFAULT_USER);
  const [noten_state, setNoten_state] = useState<Note[]>([]);

  const [init_noten_v2, noten] = useNotenStore((state) => [state.init, state.noten]);

  const globalLogout = useGlobalLogout();

  useEffect(() => {
    // if (noten.length === 0)
    init_noten_v2(user_v2)
      .then(() => setIsLoading(false))
      .catch(globalLogout);
    // else setIsLoading(false);
  }, []);

  useEffect(() => {
    setUser_v2_state(user_v2);
    setNoten_state(noten);
  }, [user_v2, noten]);

  return (
    <>
      <div className="flex flex-col items-center min-h-screen px-2 md:px-0 pwa:px-2 body-setup">
        <UserHeader user={user_v2_state} onLogout={globalLogout} />
        <MissingECTS />
        <NotenSchnitt noten={noten_state} />
        <Options show_excluded={show_excluded} setShowExcluded={setShowExcluded} />
        <NotenListe noten={noten_state} show_excluded={show_excluded} />
        <Footer />
        {isLoading && <Loading />}
      </div>
      <NotenModal />
    </>
  );
};

export default NotenPage;
