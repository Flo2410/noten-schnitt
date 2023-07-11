import { auth_options } from "app/api/auth/[...nextauth]/auth_options";
import { LogoutButton } from "components/grades/NavBar/LogoutButton";
import { getServerSession } from "next-auth";

const NavPage = async () => {
  const session = await getServerSession(auth_options);

  return (
    <div className="flex flex-col items-center justify-between px-4 py-2 bg-white rounded md:flex-row dark:bg-primary shadow-fhwn dark:shadow-fhwn-white">
      <span className="font-bold">{session?.user.name}</span>

      <div className="flex gap-4">
        <span>Matr. Nr.: {session?.user.mat_nummer}</span>
        <span>PKZ: {session?.user.student_pkz}</span>
        <span>STG: {session?.user.course}</span>
      </div>
      <LogoutButton />
    </div>
  );
};

export default NavPage;
