import NotenSchnitt from "components/ NotenSchnitt";
import Footer from "components/Footer";
import Loading from "components/Loading";
import NotenListe from "components/NotenListe";
import Options from "components/Options";
import UserHeader from "components/UserHeader";
import { UserContext } from "context/UserContext";
import Router from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { USER_COOKIE_KEY } from "types/user.types";

const NotenPage = () => {
  const { state: user, logout } = useContext(UserContext);
  const [show_excluded, setShowExcluded] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem(USER_COOKIE_KEY)) Router.push("/login");
  }, []);

  useEffect(() => {
    if (user.noten) setLoading(false);
  }, [user]);

  return (
    <div className="flex flex-col items-center px-2 md:px-0 pwa:px-2">
      <UserHeader user={user} onLogout={() => logout()} />
      <NotenSchnitt noten={user.noten} />
      <Options show_excluded={show_excluded} setShowExcluded={setShowExcluded} />
      <NotenListe noten={user.noten} show_excluded={show_excluded} />

      <Footer />

      {loading && <Loading />}
    </div>
  );
};

export default NotenPage;
