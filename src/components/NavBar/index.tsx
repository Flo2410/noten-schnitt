"use client";
import { Card } from "components/Card";
import { useSession } from "next-auth/react";
import { LogoutButton } from "./LogoutButton";
import { SelectCourse } from "./SelectCourse";

export const NavBar = () => {
  const session = useSession();

  return (
    <Card className="flex-col md:flex-row">
      <span className="font-bold">{session.data?.user.name}</span>

      <div className="flex gap-4">
        <span>Matr. Nr.: {session.data?.user.mat_nummer}</span>
        <span>PKZ: {session.data?.user.selected_course.student_pkz}</span>
        <SelectCourse />
      </div>
      <LogoutButton />
    </Card>
  );
};
