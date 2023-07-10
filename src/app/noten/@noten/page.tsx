import { auth_options } from "app/api/auth/[...nextauth]/auth_options";
import { GradeStoreInitiator } from "components/GradeStoreInitiator";
import NotenListe from "components/noten/NotenListe";
import { get_cis_grade_infos_for_user } from "helper/fhwn_cis/grades";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const NotenPage = async () => {
  const session = await getServerSession(auth_options);

  if (!session?.user) redirect("/login");

  const cis_infos = await get_cis_grade_infos_for_user(session.user);

  return (
    <>
      <GradeStoreInitiator cis_infos={cis_infos} moodle_infos={null} />
      <NotenListe />
    </>
    // </div>
  );
};

export default NotenPage;
