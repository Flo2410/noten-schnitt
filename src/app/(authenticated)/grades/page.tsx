import { auth_options } from "app/api/auth/[...nextauth]/auth_options";
import { GradeStoreInitiator } from "components/GradeStoreInitiator";
import { GradeList } from "components/grades/GradeList";
import { get_grades_with_infos } from "helper/grade.helper";
import { getServerSession } from "next-auth";

const GradePage = async () => {
  const session = await getServerSession(auth_options);

  const grades = await get_grades_with_infos(session!.user);
  if (!grades) throw new Error("Please re-authenticate!");

  return (
    <>
      <GradeStoreInitiator grades={grades} />
      <GradeList />
    </>
  );
};

export default GradePage;
