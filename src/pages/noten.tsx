import NotenSchnitt from "components/ NotenSchnitt";
import Footer from "components/Footer";
import Loading from "components/Loading";
import NotenListe from "components/NotenListe";
import NotenModal from "components/NotenModal";
import Options from "components/Options";
import UserHeader from "components/UserHeader";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { useNotenStore } from "stores/notenStore";
import { useUserStore } from "stores/userStore_v2";
import { useUserStore as useUserStore_v1 } from "stores/userStore_v1";

const NotenPage = () => {
  const [show_excluded, setShowExcluded] = useState(true);
  const [user_v2, logout_v2] = useUserStore((state) => [state.user, state.logout]);
  const [user_v1, logout_v1] = useUserStore_v1((state) => [state.user, state.logout]);
  const [init_noten_v2, noten, clear_noten] = useNotenStore((state) => [
    state.init,
    state.noten,
    state.clear,
  ]);

  useEffect(() => {
    // if (!localStorage.getItem(USER_COOKIE_KEY)) {
    //   logout_v2();
    //   clear_noten();
    //   // Router.push("/login");
    // }
    init_noten_v2(user_v1, user_v2);
  }, []);

  return (
    <>
      <div className="flex flex-col items-center min-h-screen px-2 md:px-0 pwa:px-2 body-setup">
        <UserHeader
          user={user_v2}
          onLogout={() => {
            logout_v1();
            logout_v2();
            clear_noten();
            Router.push("/login");
          }}
        />
        <NotenSchnitt noten={noten} />
        <Options show_excluded={show_excluded} setShowExcluded={setShowExcluded} />
        <NotenListe noten={noten} show_excluded={show_excluded} />
        <Footer />
        {/* {isLoading && <Loading />} */}
      </div>
      <NotenModal />
    </>
  );
};

export default NotenPage;
