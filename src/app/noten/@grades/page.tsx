import { auth_options } from "app/api/auth/[...nextauth]/auth_options";
import { GradeStoreInitiator } from "components/GradeStoreInitiator";
import { GradeList } from "components/noten/GradeList";
import { get_cis_grade_infos_for_user } from "helper/fhwn_cis/grades";
import { make_grades } from "helper/grade.helper";
import { get_moodle_course_list } from "helper/moodle/courses";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const GradePage = async () => {
  const session = await getServerSession(auth_options);

  if (!session?.user) redirect("/login");

  const cis_infos = await get_cis_grade_infos_for_user(session.user);
  const moodle_infos = await get_moodle_course_list(session.user.moodle_user);

  if (!cis_infos || !moodle_infos) redirect("/login");

  const grades = await make_grades(cis_infos, moodle_infos);

  return (
    <>
      <GradeStoreInitiator grades={grades} />
      <GradeList />
    </>
  );
};

export default GradePage;
