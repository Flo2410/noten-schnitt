import { auth_options } from "app/api/auth/[...nextauth]/auth_options";
import { Card } from "components/Card";
import { getServerSession } from "next-auth";
import { LogoutButton } from "./LogoutButton";
import { SelectCourse } from "./SelectCourse";

export const NavBar = async () => {
  const session = await getServerSession(auth_options);

  return (
    <Card className="flex-col gap-y-2 md:flex-row md:gap-0">
      <span className="font-bold">{session?.user.name}</span>

      <div className="flex items-center gap-4">
        <span>Matr. Nr.: {session?.user.mat_nummer}</span>
        <span>PKZ: {session?.user.selected_course.student_pkz}</span>

        <SelectCourse />
      </div>

      <LogoutButton />
    </Card>
  );
};
