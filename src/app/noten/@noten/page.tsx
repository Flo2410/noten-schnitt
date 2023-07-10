import { auth_options } from "app/api/auth/[...nextauth]/auth_options";
import NotenListe from "components/noten/NotenListe";
import { get_noten_for_user } from "helper/fhwn_cis/noten";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const NotenPage = async () => {
  const session = await getServerSession(auth_options);

  if (!session?.user) redirect("/login");

  const noten = await get_noten_for_user(session.user);

  return (
    // <div className="flex flex-col items-center justify-between px-4 py-2 m-2 text-white rounded md:flex-row bg-primary dark:bg-white dark:text-primary shadow-fhwn">
    <>{noten && <NotenListe show_excluded={true} noten={noten} />}</>
    // </div>
  );
};

export default NotenPage;
