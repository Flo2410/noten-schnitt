import { auth_options } from "app/api/auth/[...nextauth]/auth_options";
import { NavBar } from "components/NavBar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const AuthenticatedLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(auth_options);
  if (!session) redirect("/login");

  return (
    <div className="flex flex-col flex-1 px-2 pt-2 space-y-2 dark:text-white text-primary">
      <NavBar />
      {children}
    </div>
  );
};

export default AuthenticatedLayout;
