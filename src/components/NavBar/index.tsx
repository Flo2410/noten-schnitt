import { auth_options } from "app/api/auth/[...nextauth]/auth_options";
import { Card } from "components/Card";
import { LogoutButton } from "components/grades/NavBar/LogoutButton";
import { getServerSession } from "next-auth";

export const NavBar = async () => {
  const session = await getServerSession(auth_options);

  return (
    <Card>
      <span className="font-bold">{session?.user.name}</span>

      <div className="flex gap-4">
        <span>Matr. Nr.: {session?.user.mat_nummer}</span>
        <span>PKZ: {session?.user.student_pkz}</span>
        <span>STG: {session?.user.course}</span>
      </div>
      <LogoutButton />
    </Card>
  );
};
