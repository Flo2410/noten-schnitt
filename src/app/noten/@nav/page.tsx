import { auth_options } from "app/api/auth/[...nextauth]/auth_options";
import { LogoutButton } from "components/NavBar/LogoutButton";
import { getServerSession } from "next-auth";

const NavPage = async () => {
  const session = await getServerSession(auth_options);

  return (
    <div className="flex flex-col items-center justify-between px-4 py-2 m-2 text-white rounded md:flex-row bg-primary dark:bg-white dark:text-primary shadow-fhwn">
      <span className="font-bold text-white dark:text-primary">{session?.user.name}</span>

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
