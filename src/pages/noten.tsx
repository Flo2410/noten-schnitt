import NotenSchnitt from "components/ NotenSchnitt";
import Footer from "components/Footer";
import Loading from "components/Loading";
import NotenListe from "components/NotenListe";
import NotenModal from "components/NotenModal";
import Options from "components/Options";
import UserHeader from "components/UserHeader";
import { UserContext } from "context/UserContext";
import Router from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useUserStore } from "stores/userStore_v2";
import { USER_COOKIE_KEY } from "types/user.types";

const NotenPage = () => {
  const { state: user, logout, isLoading } = useContext(UserContext);
  const [show_excluded, setShowExcluded] = useState(true);
  const user_v2 = useUserStore((state) => state.user);

  useEffect(() => {
    if (!localStorage.getItem(USER_COOKIE_KEY)) Router.push("/login");
  }, []);

  return (
    <>
      <div className="flex flex-col items-center min-h-screen px-2 md:px-0 pwa:px-2 body-setup">
        <UserHeader user={user_v2} onLogout={() => logout()} />
        <NotenSchnitt noten={user.noten} />
        <Options show_excluded={show_excluded} setShowExcluded={setShowExcluded} />
        <NotenListe show_excluded={show_excluded} />
        <Footer />
        {isLoading && <Loading />}
      </div>
      <NotenModal />
    </>
  );
};

export default NotenPage;
