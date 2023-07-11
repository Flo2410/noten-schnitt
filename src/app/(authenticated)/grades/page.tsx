import { auth_options } from "app/api/auth/[...nextauth]/auth_options";
import { GradeStoreInitiator } from "components/GradeStoreInitiator";
import { GradeList } from "components/grades/GradeList";
import { get_grades } from "helper/grade.helper";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const GradePage = async () => {
  const session = await getServerSession(auth_options);

  const grades = await get_grades(session!.user);
  if (!grades) redirect("/login");

  return (
    <>
      <GradeStoreInitiator grades={grades} />
      <GradeList />
    </>
  );
};

export default GradePage;
